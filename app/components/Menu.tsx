import { useNavigate } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import * as React from 'react'

type Props = {
    contents: SanityDocument[]
}

export const Menu = (props:Props) => {
    return (
        <aside className="mx-8 border-2 border-[#ccc] rounded-lg w-3/12">
            <p className="py-4 border-b-2 border-b-[#ccc] text-center text-lg">記事一覧</p>
            <ul className="menu-list">
                {
                    props.contents.map(content => <React.Fragment key={content._id}><MenuList {...content} /></React.Fragment>)
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