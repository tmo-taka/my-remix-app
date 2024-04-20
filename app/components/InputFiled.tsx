type Props = {
    type: 'text'| 'password'
    name: string
}

export const InputFiled =(props:Props) => {
    return (
        <div className="field">
            <input type={props.type} name={props.name} className="input" />
        </div>
    )
}