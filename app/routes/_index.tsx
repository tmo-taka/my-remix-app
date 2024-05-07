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
    <div className="bg-gradient-to-br from-[#3F51B5] via-[#9C27B0] to-primary w-full min-h-screen center">
      <h1 className="text-8xl text-white">Welcome to Remix</h1>
      <a
        href="/login"
        rel="noreferrer"
      >
        ログインページ
      </a>
    </div>
  );
}
