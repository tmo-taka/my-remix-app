import type { SanityDocument } from "@sanity/client";

type Props = {
    tags: SanityDocument[]
}

export const TagsList = (props:Props) => {
    return(
        <ul className="flex">
            {
                props.tags.map(tag => <li key={tag.id.current}className="border-primary border-b-2 text-primary p-2 pb-1 mr-2 last:mr-0 text-sm">{tag.name}</li>)
            }
        </ul>
    )
}