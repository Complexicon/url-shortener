const toShort = document.getElementById('url-to-short');
const shortened = document.getElementById('short-url');

shortened.onclick = function() {
    if(!shortened.value) return;

    shortened.select();
    shortened.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(shortened.value);
}

async function short() {
    try {
        new URL(toShort.value);
    } catch {
        alert(`'${toShort.value}' is not an URL!`);
        return;
    }

    try {
        const response = await fetch('/short', { method: 'POST', body: JSON.stringify({ url: toShort.value }), headers: { 'content-type': 'application/json'} });
        const { shortURL } = await response.json();
    
        if(!response.ok) throw response.ok;

        shortened.value = location + shortURL;
    } catch {
        alert('something went wrong!');
    }

}