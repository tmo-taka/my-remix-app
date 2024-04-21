import { Outlet, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { getSession } from "~/session";
import { isSession, json } from "@remix-run/node";

export const loader = async () => {
    const loginSession = await getSession();
    console.log(loginSession)
    const loginFlag = isSession(loginSession);
    if(loginFlag){
        return json({ ok: true });
    } else {
        throw new Response("", { status: 404 });
    }
};

export default function Index(){
    return(
        <div>
            <header>これがヘッダーです</header>
                <Outlet />
            <footer>これがフッター</footer>
        </div>
    )
}

export function ErrorBoundary() {
    // NOTE: これはサーバーエラーの時のみ(loader側でthrowした場合のみ)
    const error = useRouteError();
    console.log('root boundary',error);
    if (isRouteErrorResponse(error)) {
        return(
            <div>404です</div>
        )
    }
}