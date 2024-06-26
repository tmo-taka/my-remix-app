import groq from "groq"

type AUTH_PARAMS = {
    user: FormDataEntryValue,
    password: FormDataEntryValue
}

export const AUTH_QUERY = ({user, password}:AUTH_PARAMS) => groq`*[_type == "auth" && user == "${user}" && password == "${password}"]`

export const ACHIEVEMENTS_QUERY = groq`*[_type == "achievement" && published == true] | order(_updatedAt desc)[0...9] {
    _id,
    title,
    slug,
    "imageUrl": main_visual.asset->url,
    _updatedAt,
    "contentsText": contents[0].children[0].text
}`

export const ACHIEVEMENT_QUERY = (slug:string) => groq`*[_type == "achievement" && published == true && slug.current == "${slug}"]{
    title,
    "tags": tags[] -> {id, name},
    create_date_from,
    create_date_to,
    "imageUrl": main_visual.asset->url,
    member,
    site_url,
    contents
}`

export const TAG_QUERY = (id:string) => groq`*[_type == "tag" && id.current == "${id}"]`

export const TAGS_QUERY = groq`*[_type == "tag"]`

export const ACHIEVEMENTS_QUERY_FROM_TAG = (tag:string) => groq`*[_type == "achievement" && published == true && "${tag}" in tags[] -> id.current]{
    _id,
    title,
    slug,
    "imageUrl": main_visual.asset->url,
    _updatedAt,
    "contentsText": contents[0].children[0].text
}`