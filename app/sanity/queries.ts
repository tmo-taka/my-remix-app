import groq from "groq"

type AUTH_PARAMS = {
    user: FormDataEntryValue,
    password: FormDataEntryValue
}

export const AUTH_QUERY = ({user, password}:AUTH_PARAMS) => groq`*[_type == "auth" && user == "${user}" && password == "${password}"]`

export const CONTENTS_QUERY = groq`*[_type == "content" && published == true]`

export const CONTENT_QUERY= (slug:string) => groq`*[_type == "content" && published == true && slug.current == "${slug}"]`

export const TAGS_QUERY = groq`*[_type == "tag"]`