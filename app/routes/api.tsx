import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node"
import { useRouteError, isRouteErrorResponse } from "@remix-run/react";
import type { SanityDocument } from "@sanity/client";
import { getSession, commitSession } from "../session";
import { loadQuery } from "~/sanity/loader.server";
import { AUTH_QUERY } from "~/sanity/queries"

export async function action({
        request,
    }: ActionFunctionArgs) {

    const session = await getSession(
        request.headers.get('Cookie')
    )

    try {
        // const body = await request.formData();
        const user:FormDataEntryValue | null = body.get('email');
        const password:FormDataEntryValue | null = body.get('password');
        // どちらも入力されていない場合はリダイレクトのみ
        if(!(user && password)) {return (redirect('/login/'))}
        const {data} = await loadQuery<SanityDocument>(AUTH_QUERY({
            user,
            password
        }));

        if(data.length){
            // ID,PASSWORDがあっている場合
            return redirect(`/login/`,{
                headers: {
                    "Set-Cookie": await commitSession(session),
                },
            });
        } else {
            // ID,PASSWORDがあっていない場合
            return (redirect('/login/'))
        }
    } catch(e) {
        throw json(
            {message: 'This is Error'},
            {status: 500},
        );
    }
}

export function ErrorBoundary() {
    // rootの方では検知されない？
    const error = useRouteError();
    if (isRouteErrorResponse(error)) {
        return (
            <main>
                <h1>エラー</h1>
                <p>{error.data.message}</p>
            </main>
        );
    }
}