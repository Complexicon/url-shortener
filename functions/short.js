function getRandomString(length) {
    const allowedCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return Array.from({ length }, () => allowedCharacters[Math.floor(Math.random() *  allowedCharacters.length)]).join('');
}

export async function onRequestPost({ request, env }) {
    try {

        const { url = null } = await request.json();

        if (!url) throw url;

        new URL(url); // validate that it is in fact a url

        let random = getRandomString(6);

        while(await env.URLS.get(random)) {
            random = getRandomString(6);
        }

        await env.URLS.put(random, url, { expirationTtl: 60 });

        return new Response(JSON.stringify({ shortURL: random }), { headers: { 'content-type': 'application/json' } });

    } catch (e) { console.log(e); return new Response(null, { status: 400 }); }
}