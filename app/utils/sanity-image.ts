import { urlFor } from "~/sanity/loader.server";

export const convertSanityImageUrl = (url:string, width:number = 640) => {
    return urlFor(url).width(width).url();
}