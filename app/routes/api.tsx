import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node"

export async function action({
        request,
    }: ActionFunctionArgs) {
    const body = await request.formData();
    console.log(body.get('email'))

    return redirect(`/login/`);
    // return json(
    //     await 'OK'
    // )
}