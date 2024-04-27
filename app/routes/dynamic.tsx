import { Outlet, useRouteError, isRouteErrorResponse } from "@remix-run/react";
import { getSession } from "~/session";
import { isSession, json } from "@remix-run/node";
import { Menu } from "~/components/Menu";

export const loader = async ({request}: LoaderFunctionArgs ) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const loginFlag = session.has('loginId');
    if(loginFlag){
        return json({logined: true});
    } else {
        // NOTE: ログイン済みではない場合は404へ飛ばす
        throw new Response("", { status: 404 });
    }
};

export default function Index(){
    const lists = [
        {id: '1', title: 'これはダミー'},
        {id: '2', title: 'これもダミー'}
    ]
    return(
        <div className="py-8 flex min-w-screen-pc-min">
            <Menu lists={lists} />
            <Outlet />
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