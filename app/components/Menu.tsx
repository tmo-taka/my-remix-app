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
        <aside className="menu">
            <p className="menu-label">記事一覧</p>
            <ul className="menu-list">
                {
                    props.lists.map(list => <MenuList {...list} />)
                }
                <li>
                    <a href=""></a>
                </li>
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
        <li>
            <a onClick={e => toLink(props.id)}>{props.title}</a>
        </li>
    )
}