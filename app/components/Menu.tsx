import { useNavigate } from "@remix-run/react";

type MenuList = {
    id: string,
    title: string
}

type Props = {
    lists: MenuList[]
}

export const Menu =(props:Props) => {
    return (
        <aside className="mx-8 border-2 border-[#ccc] rounded-lg w-3/12">
            <p className="py-4 border-b-2 border-b-[#ccc] text-center text-lg">記事一覧</p>
            <ul className="menu-list">
                {
                    props.lists.map(list => <MenuList {...list} key={list.id}/>)
                }
            </ul>
        </aside>
    )
}

const MenuList =  (props:MenuList) => {
    const navigate = useNavigate();
    const toLink = (id:string) => {
        navigate(`/dynamic/${id}`)
    }
    return (
        <li className="border-t-2 border-[#ccc] first:border-t-0">
            <a className="cursor-pointer block p-2 hover:bg-base hover:text-white hover:underline hover:decoration-primary" onClick={e => toLink(props.id)}>{props.title}</a>
        </li>
    )
}