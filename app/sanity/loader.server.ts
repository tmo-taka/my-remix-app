import { queryStore } from "~/sanity/loader";
import { client } from "~/sanity/client";
import imageUrlBuilder from '@sanity/image-url';

export const { loadQuery } = queryStore;

queryStore.setServerClient(client);

const builder = imageUrlBuilder(client);

export const urlFor = (source) =>{
    return builder.image(source)
}