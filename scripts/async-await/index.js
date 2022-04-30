
async function fetchText( url ) {
    console.log("Loading " + url + " ...");
    const result = await fetch( url, { method: 'GET', mode: 'same-origin'} );
    if(!result.ok) {
        alert("Unable to get content! Status: ", response.status);
        return Promise.resolve(null);
    }
    const blob = await result.blob();
    return blob.text();
}


const response = await fetchText( "./large-file.png");
if( response ) {
    document.body.innerText = response ;
}
