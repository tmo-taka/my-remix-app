import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// nativeFetch: true が必要
// https://github.com/remix-run/remix/issues/9324
installGlobals({
  nativeFetch: true,
});

export default defineConfig({
  plugins: [
    // single fetch=true
    remix({
      future: {
        unstable_singleFetch: true,
      },
    }),
    tsconfigPaths()
  ],
  // remixは全てサーバー側なのでproxyがいらない
  // server: {
  //   proxy: {
  //     '/json-dummy': {
  //       target: 'https://jsonplaceholder.typicode.com',
  //       // changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/json-dummy/, ''),
  //     },
  //   }
  // }
});
