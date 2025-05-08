import type { Route } from "./+types/home";
import { useEventSource } from "remix-utils/sse/react";
import { useMemo } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {

  let data = useEventSource("/sse", { event: "data" });

  const formattedTime = useMemo(() => {
    if (!data) return "";
    const date = new Date(data);
    return date.toLocaleTimeString();
  }, [data]);

  return <div>
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Current Time</h1>
      <div className="text-6xl font-mono">{formattedTime}</div>
    </div>
  </div>
}
