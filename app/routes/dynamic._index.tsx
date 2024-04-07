import { Link } from "@remix-run/react";

export default function Dynamic(){
    return(
        <div>
            動的ページです。
            <div>Topです</div>
            <ul>
                <li>
                    <Link to="1">リスト１</Link>
                </li>
            </ul>
        </div>
    )
}