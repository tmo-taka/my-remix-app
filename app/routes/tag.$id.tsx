import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { loadQuery } from "~/sanity/loader.server";
import { TAG_QUERY, ACHIEVEMENTS_QUERY_FROM_TAG } from "~/sanity/queries"
import invariant from "tiny-invariant";
import { convertSanityImageUrl } from '~/utils/sanity-image'
import { displayDate } from "~/utils/display-date"
import * as React from 'react'

export const loader = async({params}: LoaderFunctionArgs) => {
    invariant(params.id, "Expected params.id");
    const {id} = params
    const {data: tags} = await loadQuery<SanityDocument[]>(TAG_QUERY((id)));
    // NOTE: tagが見つからない場合は404
    if (tags.length === 0) { throw new Response("", { status: 404 }); }
    const {data: articles} = await loadQuery<SanityDocument[]>(ACHIEVEMENTS_QUERY_FROM_TAG((id)));
    if(articles.length > 0) {
        articles.map(article => article.imageUrl = convertSanityImageUrl(article.imageUrl,240))
    }
    const pageData = {articles, tag: tags[0]};

    return json({pageData})
}

export default function Dynamic(){
    const {pageData} = useLoaderData<typeof loader>();
    const navigate = useNavigate();
    const toLink = (slugCurrent:string) => {
        navigate(`/achievement/${slugCurrent}`)
    }

    // 日付だけを抜き取る
    const displayDateData = (date:string) => {
        const takeOutDate = date.split('T')[0]
        const displayData = displayDate(takeOutDate,'day');
        return displayData;
    }
    return(
        <div>
            <h1 className="mb-6 border-dotted border-b-2 border-primary text-4xl font-bold">{pageData.tag.name}</h1>
            <ul>
                {
                    pageData.articles.map(content => {
                        return (
                            <React.Fragment key={content._id}>
                                <li>
                                    <a onClick={e => toLink(content.slug.current)} className="flex w-2/3 px-8 py-4 justify-between border-2 border-[#CCC]">
                                        <img className="mr-4" src={content.imageUrl} alt="" />
                                        <div className="flex flex-wrap align-middle">
                                            <div className="text-2xl w-full">{content.title}</div>
                                            <div className="block w-full text-right" ><time dateTime={content._updatedAt} className="text-right text-xs text-[#ccc]">更新日:{displayDateData(content._updatedAt)}</time></div>
                                        </div>
                                    </a>
                                </li>
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </div>
    )
}