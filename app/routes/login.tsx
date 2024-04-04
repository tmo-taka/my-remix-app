import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect, json } from "@remix-run/node"
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";

export const loader = ({request}: LoaderFunctionArgs) => {
    console.log(request);
    return json([
        { id: "1", name: "Pants" },
        { id: "2", name: "Jacket" },
    ]);
}

export default function Index(){
    const navigate = useNavigate();
    const apiData = useLoaderData<typeof loader>();
    console.log(apiData)

    return(
        <div>
            <Form method="post" action="/api">
                <input type="e-mail" name="email"/>
                <button type="submit">送信</button>
            </Form>
            <a onClick={() => navigate(-1)}>前へ戻る</a>
        </div>
    )
}