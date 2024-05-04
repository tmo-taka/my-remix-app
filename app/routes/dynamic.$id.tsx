import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { loadQuery, urlFor } from "~/sanity/loader.server";
import { ACHIEVEMENT_QUERY } from "~/sanity/queries"
import invariant from "tiny-invariant";
import { TagsList } from "~/components/TagsList";

export const loader = async({params}: LoaderFunctionArgs) => {
    invariant(params.id, "Expected params.id");
    const {id} = params
    const  {data} = await loadQuery<SanityDocument[]>(ACHIEVEMENT_QUERY(id));
    const pageData = data[0];

    if(pageData) {
        const mainVisualUrl = urlFor(pageData.imageUrl).width(640).url();
        return json({pageData,mainVisualUrl})
    } else {
        throw new Response("", { status: 404 });
    }
}

type DateType = 'year' | 'month' | 'day';

// input_sample: 2023-12-11 → output_sample: 2023/12
const displayDate = (inputDate:string, by: DateType):string => {
    const utilLoopMap = new Map<DateType,number>([
        ['year',1],
        ['month', 2],
        ['day',3]
    ])
    const takeNumberArr:string[] = inputDate.split('-');
    const utilLoopCount = utilLoopMap.get(by);
    let formatDate = '';
    for (let i=0; i < utilLoopCount; i++){
        formatDate = formatDate + `${takeNumberArr[i]}/`
    }
    // 最後の'/'だけ取り除く
    return formatDate.slice(0, -1);
}

export default function Dynamic(){
    const {pageData,mainVisualUrl} = useLoaderData<typeof loader>();
    console.log(pageData)
    return(
        <div>
            <h1 className="mb-6 border-dotted border-b-2 border-primary text-4xl font-bold">{pageData.title}</h1>
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
                <div className="w-3/4 bg-[white] border-base border-4 p-4 absolute -bottom-10 left-0">
                    サイトURL：<a href={pageData.site_url} target="_blank" className="underline">{pageData.site_url}</a>
                </div>
            </div>
            <p>
                {pageData.contents[0].children[0].text}
            </p>
        </div>
    )
}