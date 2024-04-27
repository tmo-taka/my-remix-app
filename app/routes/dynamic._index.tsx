import { Link } from "@remix-run/react";

export default function Dynamic(){
    return(
        <div>
            <h1 className="mb-4 border-dotted border-b-2 border-primary text-4xl font-bold">動的ページのTOPです。</h1>
            <ul>
                <li>
                    <Link to="1">リスト１</Link>
                </li>
            </ul>
        </div>
    )
}