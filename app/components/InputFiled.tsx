import * as React from 'react'

type Props = {
    type: 'text'| 'password'
    name: string,
    label: string
}

export const InputFiled =(props:Props) => {
    const [isFocus, setIsFocus] = React.useState(false)

    return (
        <div className="mt-8 first:mt-0 pt-8 relative">
            <label className={`pb-4 absolute top-0 opacity-0 ${isFocus ? 'animate-slideIn' : ''}`}>{props.label}</label>
            <input type={props.type} name={props.name} placeholder={props.label} className="base-input" onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)}/>
        </div>
    )
}