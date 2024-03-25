import { Form} from "@remix-run/react";
import { redirect, json } from "@remix-run/node"
import type { ActionFunctionArgs } from "@remix-run/node";

// export async function loader() {
//     return json(await prisma.user.findMany());
// }

export async function action({
        request,
    }: ActionFunctionArgs) {
    const body = await request.formData();
    console.log(body)
    console.log(body.get('email'))

    return redirect(`/login/`);
}

export default function Index(){

    return(
        <Form method="post">
            <input type="e-mail" name="email"/>
            <button type="submit">送信</button>
        </Form>
    )
}