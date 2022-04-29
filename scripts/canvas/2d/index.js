import { App } from './app.js'

// create and init application
const app = new App();
app.init();

// create a bunch of entities
{
   const shape = app.shapeSystem.newRect( {x:0, y:0}, {x: app.canvas.width, y: app.canvas.height}, '#200' );
   app.newEntity( "background", shape );
}

{
   const shape = app.shapeSystem.newRect( {x:200, y:200}, {x: 500, y: 100}, '#f00' );
   app.newEntity( "red square", shape );
}

{
   const shape = app.shapeSystem.newRect( {x:520, y:0}, {x: 550, y: 500}, '#f0f' );
   app.newEntity( "violet area", shape );
}

{
   const shape = app.shapeSystem.newRect( {x:0, y:250}, {x: app.canvas.width, y: 255}, '#fff' );
   app.newEntity( "white stripe", shape );
}

{
   const shape = app.shapeSystem.newRect( {x:0, y:0}, {x: 100, y: 100}, '#ff0' );
   app.newEntity( "yellow", shape );
}

// some globals
let direction = 1;

// set update callback with custom code
app.onUpdate( (dt) => { // delta in seconds

   const ent   = app.getEntityByName("yellow");   
   const shape = ent.shape;

   const speed = 200; // pixel per sec
   direction = shape.position.x > app.canvas.width - shape.size.x ? -direction : direction;
   direction = shape.position.x < 0 ? -direction : direction;
   shape.translate( direction * speed * dt, 0);
})

// start the update loop
app.start();

// TODO: listen Esc key pressed event to stop
// app.stop()

