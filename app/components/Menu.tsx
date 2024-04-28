import { useNavigate } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";

type Props = {
    contents: SanityDocument[]
}

export const Menu =(props:Props) => {
    return (
        <aside className="mx-8 border-2 border-[#ccc] rounded-lg w-3/12">
            <p className="py-4 border-b-2 border-b-[#ccc] text-center text-lg">記事一覧</p>
            <ul className="menu-list">
                {
                    props.contents.map(content => <MenuList {...content} key={content._id}/>)
                }
            </ul>
        </aside>
    )
}

const MenuList =  (props:SanityDocument) => {
    const navigate = useNavigate();
    const toLink = (slugCurrent:string) => {
        navigate(`/dynamic/${slugCurrent}`)
    }
    return (
        <li className="border-t-2 border-[#ccc] first:border-t-0">
            <a className="cursor-pointer block p-2 hover:bg-base hover:text-white hover:underline hover:decoration-primary" onClick={e => toLink(props.slug.current)}>{props.title}</a>
        </li>
    )
}