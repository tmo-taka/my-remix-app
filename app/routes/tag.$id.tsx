import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { loadQuery, urlFor } from "~/sanity/loader.server";
import { TAG_QUERY } from "~/sanity/queries"
import invariant from "tiny-invariant";
import { TagsList } from "~/components/TagsList";

export const loader = async({params}: LoaderFunctionArgs) => {
    invariant(params.id, "Expected params.id");
    const {id} = params
    const {data} = await loadQuery<SanityDocument[]>(TAG_QUERY((id)));
    const pageData = data;

    if(pageData) {
        return json({pageData})
    } else {
        throw new Response("", { status: 404 });
    }
}

export default function Dynamic(){
    const {pageData} = useLoaderData<typeof loader>();
    console.log(pageData)
    return(
        <div>yah</div>
    )
}