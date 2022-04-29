import { ShapeSystem } from "./shape.js";
import { Entity } from './entity.js'

class App {

    canvas         = null; 
    ctx            = null;
    entities       = [];
    time           = null;
    shouldStop     = false;
    updateCallback = (dt) => {};

    /** Responsible for managing/drawing shapes */
    shapeSystem;

    constructor() {
        this.shapeSystem    = new ShapeSystem();
    }

    _loop = (timestamp) => {
        if( !this.timestamp ) {
            this.timestamp = timestamp;
        }
        this._update( (timestamp - this.timestamp) / 1000);
        this._draw();
        this.timestamp = timestamp;
        if( !this.shouldStop ) {
            requestAnimationFrame(this._loop)
        }
    }

    start() {
        this.shouldStop = false;
        requestAnimationFrame(this._loop)
    }

    stop() {
        this.shouldStop = true;
    }    

    onUpdate = ( cb ) => {
        this.updateCallback = cb;
    }

    /**
     * Initialise application (canvas, 2d context, timers, etc...)
     */
    init() {
        this.canvas        = document.querySelector("#viewport");
        this.canvas.width  = 640;
        this.canvas.height = 480;
        this.ctx           = this.canvas.getContext('2d');
        this.time          = 0;        
    }

    _update(dt) {
        this.entities.forEach( entity => entity.update(dt))
        this.updateCallback(dt);
    }

    _draw() {
        this.shapeSystem.draw(this.ctx);
    }

    /**
     * Create a new entity with a set of components
     * @param {string} name 
     * @param {Shape} shape 
     * @returns {Entity} 
     */
    newEntity( name, shape ) {
        const entity = new Entity( name );
        if( shape ) {
            entity.setShape(shape);
        }
        this.entities.push( entity );
        return entity;
    }

    /**
     * Get and entity given its name
     * @param {string} name 
     * @returns {Entity} object or undefined if not found
     */
    getEntityByName( name ) {
        const idx = this.entities.findIndex( each => each.name === name);
        if( idx !== -1) {
            return this.entities[idx];
        }
        return undefined;
    }
    
}

export {App}