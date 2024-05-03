import type { SanityDocument } from "@sanity/client";

type Props = {
    tags: SanityDocument[]
}

export const TagsList = (props:Props) => {
    return(
        <ul className="flex">
            {
                props.tags.map(tag => <li key={tag.id.current}className="bg-primary text-white font-bold p-2 rounded-3xl mr-2 last:mr-0 text-sm">{tag.name}</li>)
            }
        </ul>
    )
}