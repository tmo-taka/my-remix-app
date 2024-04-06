import {
    Outlet,
} from "@remix-run/react";

export default function Index(){
    return(
        <div>
            <header>これがヘッダーです</header>
                <Outlet />
            <footer>これがフッター</footer>
        </div>
    )
}