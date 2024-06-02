import { Outlet } from "@remix-run/react";

type Props = {
    title: string,
    children: JSX.Element
}

export const Section = (props:Props) => {
    return(
        <section className="py-8">
            <h2 className="mb-4 px-3 py-1 text-2xl border-l-primary border-l-4">{props.title}</h2>
            {props.children}
        </section>
    )
}