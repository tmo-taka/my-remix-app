import groq from "groq"

type AUTH_PARAMS = {
    user: FormDataEntryValue,
    password: FormDataEntryValue
}

export const AUTH_QUERY = ({user, password}:AUTH_PARAMS) => groq`*[_type == "auth" && user == "${user}" && password == "${password}"]`