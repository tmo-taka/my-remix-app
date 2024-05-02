import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { SanityDocument } from "@sanity/client";
import { loadQuery } from "~/sanity/loader.server";
import { TAGS_QUERY } from "~/sanity/queries"

export const loader = async ({request}: LoaderFunctionArgs ) => {
    const {data: tags} = await loadQuery<SanityDocument[]>(TAGS_QUERY);
    return json({tags})
}

export default function Dynamic(){
    const {tags} = useLoaderData<typeof loader>();
    console.log(tags);
    return(
        <div>
            <h1 className="mb-4 border-dotted border-b-2 border-primary text-4xl font-bold">動的ページのTOPです。</h1>
            <ul className="flex">
                {
                    tags.map(tag => <li className="bg-primary text-white font-bold p-2 rounded-3xl mr-2 last:mr-0 text-sm">{tag.name}</li>)
                }
            </ul>
        </div>
    )
}