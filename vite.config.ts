import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
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
