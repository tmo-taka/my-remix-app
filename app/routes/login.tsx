import { Form, useNavigate, useLoaderData} from "@remix-run/react";
import { InputFiled } from "~/components/InputFiled";
import { json, redirect } from "@remix-run/node";
import { getSession } from "~/session";
import type { LoaderFunctionArgs } from "@remix-run/node";

export const loader = async ({request}: LoaderFunctionArgs ) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const loginFlag = session.has('loginId');
    if(loginFlag){
        // NOTE: ログイン済みの場合はリダイレクトさせる
        return redirect('/dynamic/');
    } else {
        return json({logined: false})
    }
};

export default function Index(){
    const navigate = useNavigate();
    const { logined } = useLoaderData();

    return(
        <div>
            <form method="post" action="/api" className="p-2">
                <InputFiled
                    type='text'
                    name='user'
                />
                <InputFiled
                    type='password'
                    name='password'
                />
                <button type="submit" className="base-btn">送信</button>
            </form>
            <a onClick={() => navigate(-1)} className="text-3xl">前へ戻る</a>
        </div>
    )
}