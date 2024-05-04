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

export default function Dynamic(){
    const {pageData,mainVisualUrl} = useLoaderData<typeof loader>();
    console.log(pageData)
    return(
        <div>
            <h1 className="mb-4 border-dotted border-b-2 border-primary text-4xl font-bold">{pageData.title}</h1>
            <TagsList tags={pageData.tags} />
            <div>
                <img src={mainVisualUrl} alt="" />
            </div>
        </div>
    )
}