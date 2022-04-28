class App {

    constructor() {
        this.canvas = null; 
        this.ctx    = null;
        this.shapes = [];
        this.time   = null;
        this.shouldStop = false;
        this.updateCallback = (dt) => {}
    }

    loop = (timestamp) => {
        if( !this.timestamp ) {
            this.timestamp = timestamp;
        }
        this.update( (timestamp - this.timestamp) / 1000);
        this.draw();
        this.timestamp = timestamp;
        if( !this.shouldStop ) {
            requestAnimationFrame(this.loop)
        }
    }

    start() {
        requestAnimationFrame(this.loop)
    }
    

    onUpdate = ( cb ) => {
        this.updateCallback = cb;
    }

    init()
    {
        const canvas  = document.querySelector("#viewport");
        canvas.width  = 640;
        canvas.height = 480;
        this.canvas   = canvas;
        this.ctx      = canvas.getContext('2d');
        this.time     = 0;        
    }

    update(dt) {
        this.shapes.forEach( shape => shape.update(dt))
        this.updateCallback(dt);
    }

    addShape( shape ) {
        this.shapes.push( shape );
        return shape;
    }

    draw() {
        this.shapes.forEach( shape => shape.draw(this.ctx))
    }
    
}

export {App}