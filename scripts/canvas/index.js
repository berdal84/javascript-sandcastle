import { Rect } from './rect.js'
import { App } from './app.js'

const app = new App();
app.init();

app.addShape( new Rect( 0, 0, app.canvas.width, app.canvas.height, '#200') );
app.addShape( new Rect( 200, 200, 500, 100, '#f00') );
app.addShape( new Rect( 520, 0, 550, 500, '#f0f') );
app.addShape( new Rect( 0, 250, app.canvas.width, 255, '#fff') );
const yellow = app.addShape( new Rect( 0, 0, 100, 100, '#ff0') );

let direction = 1;

app.onUpdate( (dt) => { // delta in seconds
   const speed = 200; // pixel per sec
   direction = yellow.tl.x > app.canvas.width - yellow.width() ? -direction : direction;
   direction = yellow.tl.x < 0 ? -direction : direction;
   yellow.translate( direction * speed * dt, 0);
})

app.start();

