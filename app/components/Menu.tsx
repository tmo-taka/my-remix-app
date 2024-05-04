import { useNavigate } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import * as React from 'react'

type Props = {
    contents: SanityDocument[]
}

export const Menu = (props:Props) => {
    return (
        <aside className="mx-8 border-2 border-[#ccc] rounded-lg w-auto overflow-hidden">
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
    // 日付だけを抜き取る
    const takeOutDate = props._updatedAt.split('T')[0]
    const displayDateData = takeOutDate.replaceAll('-','/');
    return (
        <li className="border-t-2 border-[#ccc] first:border-t-0">
            <a className="group/link cursor-pointer block p-2 hover:bg-base" onClick={e => toLink(props.slug.current)}>
                <span className="group-hover/link:text-white group-hover/link:underline group-hover/link:decoration-primary">{props.title}</span>
                <span className="block text-right" ><time dateTime={props._updatedAt} className="text-right text-xs text-[#ccc]">更新日:{displayDateData}</time></span>
            </a>
        </li>
    )
}