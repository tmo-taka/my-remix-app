import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node"

export async function loader({request}: LoaderFunctionArgs) {
    console.log(request);
    return await json({
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}