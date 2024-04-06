import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = ({params}: LoaderFunctionArgs) => {
    console.log(params.id);
    return {id: params.id}
}

export default function Dynamic(){
    const data = useLoaderData<typeof loader>();

    return(
        <div>
            動的ページです。
            <div>id: {data.id}</div>
        </div>
    )
}