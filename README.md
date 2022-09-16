# file-server-cf-worker

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/sya-ri/file-server-cf-worker)

Replace [sya-ri/file-server](https://github.com/sya-ri/file-server) by using Cloudflare workers.
It's like a proxy for WebDAV and makes it easy to share files.

## Environment variables

| Key         | Type   |
|-------------|--------|
| WEBDAV_URL  | string |
| WEBDAV_USER | string |
| WEBDAV_PASS | string |
