import { Outlet, useRouteError, useLoaderData, isRouteErrorResponse } from "@remix-run/react";
import { getSession } from "~/session";
import { isSession, json } from "@remix-run/node";
import { Menu } from "~/components/Menu";
import type { SanityDocument } from "@sanity/client";
import { loadQuery } from "~/sanity/loader.server";
import { ACHIEVEMENTS_QUERY } from "~/sanity/queries"

export const loader = async ({request}: LoaderFunctionArgs ) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const loginFlag = session.has('loginId');
    if(loginFlag){
        const {data} = await loadQuery<SanityDocument[]>(ACHIEVEMENTS_QUERY);
        return json({contents: data});
    } else {
        // NOTE: ログイン済みではない場合は404へ飛ばす
        throw new Response("", { status: 404 });
    }
};

export default function Index(){
    const contents = useLoaderData<typeof loader>();

    return(
        <div className="py-8 flex items-start min-w-screen-pc-min">
            <div className="w-1/4">
                <Menu {...contents} />
            </div>
            <div className="w-3/4">
                <Outlet />
            </div>
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