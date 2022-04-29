const canvas = document.getElementById("canvas");
console.assert(canvas, "canvas element not found!")
canvas.width  = 640;
canvas.height = 480;

const copyright = document.getElementById("copyright");
console.assert(copyright, "copyright element not found!")
copyright.innerText = "Canvas using webgl";