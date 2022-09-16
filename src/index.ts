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
			return new Response(response.body);
		}
		return new Response("File not found", { status: 404 });
	},
};
