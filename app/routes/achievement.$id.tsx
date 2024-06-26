import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { loadQuery, urlFor } from "~/sanity/loader.server";
import { ACHIEVEMENT_QUERY } from "~/sanity/queries"
import invariant from "tiny-invariant";
import { TagsList } from "~/components/TagsList";
import { displayDate } from "~/utils/display-date";
import { convertSanityImageUrl } from "~/utils/sanity-image";

export const loader = async({params}: LoaderFunctionArgs) => {
    invariant(params.id, "Expected params.id");
    const {id} = params
    const  {data} = await loadQuery<SanityDocument[]>(ACHIEVEMENT_QUERY(id));
    const pageData = data[0];

    if(pageData) {
        const mainVisualUrl = convertSanityImageUrl(pageData.imageUrl);
        return json({pageData,mainVisualUrl})
    } else {
        throw new Response("", { status: 404 });
    }
}

export default function Dynamic(){
    const {pageData,mainVisualUrl} = useLoaderData<typeof loader>();
    console.log(pageData)
    return(
        <div className="relative pb-32 overflow-hidden">
            <h1 className="mb-6 border-dotted border-b-2 border-primary text-4xl font-bold">{pageData.title}</h1>
            <div className="pr-8">
                <div className="mb-8 flex items-center justify-between">
                    <TagsList tags={pageData.tags} />
                    <div className="align-middle">
                        制作期間：<time dateTime={pageData.create_date_from}>{displayDate(pageData.create_date_from,'month')}</time>〜
                        <time dateTime={pageData.create_date_to}>{displayDate(pageData.create_date_to,'month')}</time>
                    </div>
                </div>
                <div className="mb-24">
                    <img className="m-auto border-[#ccc] border-2" src={mainVisualUrl} alt="" />
                </div>
                <div className="mb-32 flex justify-end items-start relative">
                    <dl className="p-6 w-72 min-h-72 bg-base text-white flex flex-wrap content-center [&>dt]:w-4/5 [&>dd]:w-1/5">
                        <dt>デイレクター</dt><dd>{pageData.member.dir}</dd>
                        <dt>デザイン</dt><dd>{pageData.member.design}</dd>
                        <dt className="text-primary">フロントエンド</dt><dd className="text-primary">{pageData.member.front}</dd>
                        <dt>バックエンド</dt><dd>{pageData.member.back}</dd>
                    </dl>
                    <div className="overflow-hidden absolute -bottom-10 left-0 w-3/4">
                        <div className="box-border bg-[white] border-base border-4 group/url before:content-[''] before:block before:absolute before:-top-1 before:right-0 before:w-1 before:h-full before:bg-primary before:-translate-y-full after:content-[''] after:block after:absolute after:-bottom-1 after:left-0 after:w-1 after:h-full after:bg-primary after:translate-y-full hover:before:translate-y-0">
                            <div className="relative p-4 before:content-[''] before:block before:absolute before:-top-1 before:left-0 before:h-1 before:w-full before:bg-primary before:-translate-x-full after:content-[''] after:block after:absolute after:-bottom-1 after:right-0 after:h-1 after:w-full after:bg-primary after:translate-x-full group-hover/url:before:translate-x-0 group-hover/url:after:translate-x-0">
                                サイトURL：<a href={pageData.site_url} target="_blank" className="underline">{pageData.site_url}</a>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="tracking-wider">
                    {pageData.contents[0].children[0].text}
                </p>
                <a className="block p-4 text-primary border-double border-x-4 border-t-4 border-primary absolute bottom-0 right-8 hover:translate-y-4 leading-8" href="#pageTop">TOP</a>
            </div>
        </div>
    )
}