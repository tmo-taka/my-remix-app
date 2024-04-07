import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async({params}: LoaderFunctionArgs) => {
    const {id} = params
    const  response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    console.log(response)
    const todo = await response.json()
    return {id, todo}
}

export default function Dynamic(){
    const data = useLoaderData<typeof loader>();
    console.log(data.todo)
    return(
        <div>
            動的ページです。
            <div>id: {data.id}</div>
        </div>
    )
}