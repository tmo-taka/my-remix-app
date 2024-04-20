import { Form, useNavigate } from "@remix-run/react";
import { InputFiled } from "~/components/InputFiled";

export default function Index(){
    const navigate = useNavigate();

    return(
        <div>
            <Form method="post" action="/api" className="box">
                <InputFiled
                    type='text'
                    name='user'
                />
                <InputFiled
                    type='password'
                    name='password'
                />
                <button type="submit" className="button bulma-control-mixin">送信</button>
            </Form>
            <a onClick={() => navigate(-1)}>前へ戻る</a>
        </div>
    )
}