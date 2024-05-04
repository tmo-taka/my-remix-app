import { createCookieSessionStorage } from "@remix-run/node";

const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData, SessionFlashData>(
    {
        cookie: {
            name: "__session",

            // all of these are optional
            domain: "localhost",
            // Expires can also be set (although maxAge overrides it when used in combination).
            // Note that this method is NOT recommended as `new Date` creates only one date on each server deployment, not a dynamic date in the future!
            //
            // expires: new Date(Date.now() + 60_000),
            httpOnly: true,
            maxAge: 7200, //2時間
            path: "/",
            sameSite: "lax",
            secure: true,
            secrets: ['ldfaeffghag','d100']
        },
    }
);

export { getSession, commitSession, destroySession };