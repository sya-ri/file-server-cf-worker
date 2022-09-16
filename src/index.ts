export interface Env {
	WEBDAV_URL: string;
	WEBDAV_USER: string;
	WEBDAV_PASS: string;
}

export default {
	async fetch(
		request: Request,
		env: Env,
		// ctx: ExecutionContext
	): Promise<Response> {
		const { pathname } = new URL(request.url);
		if (pathname && pathname !== '/') {
			const response = await fetch(
				`${env.WEBDAV_URL}/${pathname}`,
				{
					method: 'GET',
					headers: {
						Authorization: "Basic " + btoa(`${env.WEBDAV_USER}:${env.WEBDAV_PASS}`),
					}
				}
			);
			if (response.ok) {
				const body = response.body;
				const rawLength = response.headers.get("Content-Length");
				if (rawLength) {
					const length = parseInt(rawLength);
					if (!isNaN(length)) {
						console.info(`${pathname}: Response ${length} bytes`)
						return new Response(body);
					} else {
						console.warn(`${pathname}: Content-Length is not number (${rawLength})`)
					}
				} else {
					console.warn(`${pathname}: Content-Length not found`)
				}
			} else {
				console.warn(`${pathname}: Fetch error (${response.status}: ${response.statusText})`)
			}
		}
		return new Response("File not found", { status: 404 });
	},
};
