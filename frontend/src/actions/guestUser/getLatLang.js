const key = 'Cku0hoGuiEWdShZBEE0C';

export async function getLatLang(){
    const rsp = await fetch(`https://api.maptiler.com/geolocation/ip.json?key=${key}`);
    const data = await rsp.json();
    const {latitude, longitude} = data;
    return {latitude, longitude};
}