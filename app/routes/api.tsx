import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node"
import { getSession, commitSession } from "../session";

export async function action({
        request,
    }: ActionFunctionArgs) {

    const session = await getSession(
        request.headers.get('Cookie')
    )
    console.log(session)
    const body = await request.formData();
    console.log(body.get('email'))

    return redirect(`/login/`,{
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
}