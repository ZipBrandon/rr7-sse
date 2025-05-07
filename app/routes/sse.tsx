import { eventStream } from "remix-utils/sse/server";
import type { Route } from "./+types/sse";
import { interval } from "remix-utils/timers";
export const loader = async ({
	request,
	context,
	params,
}: Route.LoaderArgs) => {
	const abortController = new AbortController();
	abortController.signal.addEventListener("abort", () =>
		abortController.abort(),
	);

	return eventStream(request.signal, function setup(send) {
		async function run() {
			for await (const _ of interval(1000, { signal: request.signal })) {
				send({ event: "data", data: new Date().toISOString() });
			}
		}

		run();

		return () => {

		}
	});
};
