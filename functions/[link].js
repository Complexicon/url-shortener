export async function onRequestGet({ env, params, next }) {
    const url = await env.URLS.get(params.link);

    if (url) {
        return new Response(null, { status: 301, headers: { 'location': url } });
    }

    return await next();
}