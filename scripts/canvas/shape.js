class ShapeSystem {

    constructor() {
        this.shapes = [];
        this.updateCallback = (dt) => {}
    }

    onUpdate( cb ) {
        this.updateCallback = cb;
    }

    update( dt ) {
        this.updateCallback(dt);
    }

    /**
     * Draw all shapes
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        this.shapes.forEach( each => each.draw(ctx))
    }

    /**
     * @param {{x: number, y: number}} min is the min coordinates (top left corner)
     * @param {{x: number, y: number}} max is the max coordinates (bottom right corner)
     * @param {string} color 
     */
    newRect( min, max, color ) {
        const shape = new Rectangle( min, max, color );
        this.shapes.push( shape );
        return shape;
    }
}

class IShape {
    constructor(color)
    {
        this.color = color;
        this.position = {
            x: 0,
            y: 0
        }
    }    
    translate = ( x, y ) => {
        this.position.x += x;
        this.position.y += y;
    }
    draw = (ctx) => {}
}

class Rectangle extends IShape {
    /**
     * @param {{x: number, y: number}} min is the min coordinates (top left corner)
     * @param {{x: number, y: number}} max is the max coordinates (bottom right corner)
     * @param {string} color 
     */
    constructor( min, max, color ) {
        super(color);
        this.min = min;
        this.max = max;
        this.size = { x: null, y: null }
        this._updateSize();
        this.draw = ( ctx ) => {
            ctx.fillStyle = this.color;
            ctx.fillRect(
                this.min.x + this.position.x,
                this.min.y + this.position.y,
                this.size.x,
                this.size.y);
        }
    }

    _updateSize() {
        this.size.x = this.max.x - this.min.x;
        this.size.y = this.max.y - this.min.y;
    }
}

export { ShapeSystem, IShape, Rectangle }