import { useLoaderData, Link } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { SanityDocument } from "@sanity/client";
import { loadQuery } from "~/sanity/loader.server";
import { TAGS_QUERY, ACHIEVEMENTS_QUERY } from "~/sanity/queries"
import { TagsList } from "~/components/TagsList";
import { AchievementLists } from "~/components/AchievementLists";
import { Section } from "~/components/Section";

export const loader = async ({request}: LoaderFunctionArgs ) => {
    const {data: tags} = await loadQuery<SanityDocument[]>(TAGS_QUERY);
    const {data: achievements} = await loadQuery<SanityDocument[]>(ACHIEVEMENTS_QUERY);
    return json({tags, achievements})
}

export default function Dynamic(){
    const {tags, achievements} = useLoaderData<typeof loader>();
    return(
        <div>
            <h1 className="mb-4 border-dotted border-b-2 border-primary text-4xl font-bold">制作実績</h1>
            <Section title="対応可能な技術リスト">
                <TagsList tags={tags} />
            </Section>
            <Section title="直近の制作実績">
                <AchievementLists contents={achievements}/>
            </Section>
        </div>
    )
}