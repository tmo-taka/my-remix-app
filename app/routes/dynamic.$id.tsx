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
        const mainVisualUrl = urlFor(pageData.imageUrl).width(200).url();
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
    console.log(takeNumberArr);
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
            <div className="flex items-center justify-between">
                <TagsList tags={pageData.tags} />
                <div className="align-middle">
                    制作期間：<time dateTime={pageData.create_date_from}>{displayDate(pageData.create_date_from,'month')}</time>〜
                    <time dateTime={pageData.create_date_to}>{displayDate(pageData.create_date_to,'month')}</time>
                </div>
            </div>
            <div>
                <img src={mainVisualUrl} alt="" />
            </div>
        </div>
    )
}