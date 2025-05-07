import type { Route } from "./+types/home";
import { useEventSource } from "remix-utils/sse/react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  let data = useEventSource("/sse", { event: "data" });


  return <div>

    <h1>Home</h1>

<div>{data}</div>
  </div>
}
