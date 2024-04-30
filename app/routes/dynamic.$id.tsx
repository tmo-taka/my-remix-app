import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { loadQuery } from "~/sanity/loader.server";
import { CONTENT_QUERY } from "~/sanity/queries"

export const loader = async({params}: LoaderFunctionArgs) => {
    const {id} = params
    const  {data} = await loadQuery<SanityDocument[]>(CONTENT_QUERY(id));
    const pageData = data[0];

    if(pageData) {
        return json({pageData})
    } else {
        throw new Response("", { status: 404 });
    }
}

export default function Dynamic(){
    const {pageData} = useLoaderData<typeof loader>();
    return(
        <div>
            <h1 className="mb-4 border-dotted border-b-2 border-primary text-4xl font-bold">{pageData.title}</h1>
        </div>
    )
}