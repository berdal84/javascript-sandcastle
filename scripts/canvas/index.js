
const canvas = document.querySelector("#viewport");

canvas.width  = 640;
canvas.height = 480;

const ctx = canvas.getContext('2d');

ctx.fillRect(0,0, canvas.width, canvas.height);