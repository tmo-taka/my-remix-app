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
        return redirect('/achievement/');
    } else {
        return json({logined: false})
    }
};

export default function Index(){
    const navigate = useNavigate();
    const { logined } = useLoaderData();

    return(
        <div className="py-8 min-w-screen-pc-min">
            <form method="post" action="/api" className="p-4">
                <InputFiled
                    type='text'
                    name='user'
                    label='ユーザー名'
                />
                <InputFiled
                    type='password'
                    name='password'
                    label='パスワード'
                />
                <button type="submit" className="base-btn mt-8 mx-auto block">送信</button>
            </form>
            <a onClick={() => navigate(-1)} className="mx-4 text-link cursor-pointer">前へ戻る</a>
        </div>
    )
}