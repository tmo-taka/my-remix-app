import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
  isRouteErrorResponse
} from "@remix-run/react";
import type { LoaderFunctionArgs, LinksFunction } from "@remix-run/node";
import stylesheet from "~/assets/tailwind.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const loader = ({request}: LoaderFunctionArgs) => {
  try {
    // const error = useRouteError();
    // console.log('layout-loader',error);
    // console.log('layout-loader',request)
    return json({
      ENV: {
        SANITY_STUDIO_PROJECT_ID: process.env.SANITY_STUDIO_PROJECT_ID,
        SANITY_STUDIO_DATASET: process.env.SANITY_STUDIO_DATASET,
        SANITY_STUDIO_URL: process.env.SANITY_STUDIO_URL,
        SANITY_STUDIO_STEGA_ENABLED: process.env.SANITY_STUDIO_STEGA_ENABLED,
      },
    });
  } catch (e:unknown) {
    console.log('loaderでのエラー',e)
  }
};


export function Layout({ children }: { children: React.ReactNode }) {
  const error = useRouteError();
  if(error) {
    // throw json({
    //   status: error.status
    // })
    console.log('layout',error)
    // NOTE: 404に関してはこちらに飛ぶ
    return(
      <html lang="ja">
        <body>
          <h1>{error.status}</h1>
          <p>{error.data}</p>
        </body>
      </html>
    );
  }
  const {ENV} = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {/* {children} */}
        <Outlet context={{txt: 'dummy'}} />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.ENV = ${JSON.stringify(ENV)}`,
            }}
          />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  // NOTE: これはサーバーエラーの時のみ(loader側でthrowした場合のみ)
  const error = useRouteError();
  console.log('root boundary',error);
  if (isRouteErrorResponse(error)) {
    return(
      <div>500です</div>
    )
  }
}
