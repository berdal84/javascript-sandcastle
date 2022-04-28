import { IShape } from './shape.js'

class Entity {

    name       = null;
    components = [];
    shape      = null;

    constructor( name ) {
        this.name       = name;
    }

    setShape( c ) {
        if( c instanceof IShape ) {
            this.shape = c;
        } else {
            console.error('This component is not a Shape!')
        }
    }

    getShape() {
        return this.shape;
    }

    update ( dt ) {

    }
}

export { Entity }