

function main() {
    const canvas = document.getElementById("canvas");
    if( !canvas ) {
        alert("canvas element not found!");
        return;
    }
    canvas.width  = 640;
    canvas.height = 480;

    const copyright = document.getElementById("copyright");
    if( !copyright ) {
        alert("copyright element not found!");
        return;
    }
    copyright.innerText = "Exercise - HTML5 canvas with webgl context";

    const gl = canvas.getContext('webgl')
    if( !gl ) {
        alert("can't get wegl context!");
        return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload = main;