import { useNavigate } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";

type Props = {
    tags: SanityDocument[]
}

export const TagsList = (props:Props) => {
    console.log(props.tags[0].id.current);
    const navigate = useNavigate();
    const toLink = (idCurrent:string) => {
        // TODO: なぜかzeroWidthが入り込むので原因確認
        let zeroWidthSpace = /[\u200B-\u200D\uFEFF]/g;
        const removeZeroWidth = idCurrent.replace(zeroWidthSpace,'');
        navigate(`/tag/${removeZeroWidth}`)
    }
    return(
        <ul className="flex">
            {
                props.tags.map(tag => {
                return (
                        <li key={tag.id.current} className="overflow-hidden text-primary p-2 pb-2 mr-2 last:mr-0 text-sm relative before:content-[''] before:w-1/2 before:h-0.5 before:absolute before:bg-primary before:left-0 before:-bottom-0 after:content-[''] after:w-1/2 after:h-0.5 after:absolute after:bg-primary after:right-0 after:bottom-0 hover:before:-translate-x-full hover:after:translate-x-full before:transition-transform after:transition-transform">
                            <a onClick={e => toLink(tag.id.current)}>{tag.id.current}</a>
                        </li>
                    )
                })
            }
        </ul>
    )
}