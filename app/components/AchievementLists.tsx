import { useNavigate } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { displayDate } from "~/utils/display-date"
import * as React from 'react'

type Props = {
    contents: SanityDocument[]
}

export const AchievementLists = (props:Props) => {
    const navigate = useNavigate();
    const toLink = (slugCurrent:string) => {
        navigate(`/achievement/${slugCurrent}`)
    }

    // 日付だけを抜き取る
    const displayDateData = (date:string) => {
        const takeOutDate = date.split('T')[0]
        const displayData = displayDate(takeOutDate,'day');
        return displayData;
    }

    return (
        <ul>
            {
                props.contents.map(content => {
                    return (
                        <React.Fragment key={content._id}>
                            <li>
                                <a onClick={e => toLink(content.slug.current)} className="group block w-1/3 px-2 py-3 border-2 border-base">
                                    <div className="mb-4 flex flex-wrap justify-center relative">
                                        <img className="" src={content.imageUrl} alt="" />
                                        <div className="bg-base opacity-40 absolute w-full h-full group-hover:opacity-0"></div>
                                    </div>
                                    <div className="flex flex-wrap align-middle">
                                        <div className="text-xl w-full mb-4">{content.title}</div>
                                        <p className="text-ellipsis line-clamp-3 text-xs mb-2">{content.contentsText}</p>
                                        <div className="block w-full text-right" ><time dateTime={content._updatedAt} className="text-right text-xs text-[#ccc]">更新日:{displayDateData(content._updatedAt)}</time></div>
                                    </div>
                                </a>
                            </li>
                        </React.Fragment>
                    )
                })
            }
        </ul>
    )
}