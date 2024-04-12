import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node"
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
        const data = await loadQuery<SanityDocument>(AUTH_QUERY);
        console.log('kore',data);
        const body = await request.formData();
        console.log(body.get('email'))
        console.log(body.get('passsword'))

        return redirect(`/login/`,{
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    } catch(e) {
        console.log(e);
        throw new Error(e)
    }
}