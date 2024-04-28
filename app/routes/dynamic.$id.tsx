import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const loader = async({params}: LoaderFunctionArgs) => {
    const {id} = params
    const  response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const todo = await response.json()
    return {id, todo}
}

export default function Dynamic(){
    const data = useLoaderData<typeof loader>();
    console.log(data.todo)
    return(
        <div>
            <h1 className="mb-4 border-dotted border-b-2 border-primary text-4xl font-bold">動的ページ</h1>
            <div>id: {data.id}</div>
        </div>
    )
}