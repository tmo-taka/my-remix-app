import type { MetaFunction } from "@remix-run/node";
import { SampleText } from "../components/SampleText"

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="w-full min-h-screen center px-8 py-32">
      <h1 className="mb-36 text-8xl text-white">Welcome to Remix</h1>
      <div className="flex justify-center">
        <a
          href="/login"
          rel="noreferrer"
          className="text-3xl text-white"
        >
          ログインページ
        </a>
      </div>
    </div>
  );
}
