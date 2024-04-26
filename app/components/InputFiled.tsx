type Props = {
    type: 'text'| 'password'
    name: string
}

export const InputFiled =(props:Props) => {
    return (
        <div className="mt-8 first:mt-0">
            <input type={props.type} name={props.name} className="base-input" />
        </div>
    )
}