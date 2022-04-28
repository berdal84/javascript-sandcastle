const Rect = function( xmin, ymin, xmax, ymax, color) {
    this.tl = {
        x: xmin,
        y: ymin
    };
    this.br = {
        x: xmax,
        y: ymax
    };
    this.color = color;
    this.updateCallback = (dt) => {}
    
    this.translate = (x, y) => {
        this.tl.x += x;
        this.tl.y += y;
        this.br.x += x;
        this.br.y += y;
    }

    this.width = () => {
        return this.br.x - this.tl.x;
    }

    this.height = () => {
        return this.br.y - this.tl.y;
    }

    this.onUpdate = ( cb ) => {
        this.updateCallback = cb;
    }
    this.update = ( dt ) => {
        this.updateCallback(dt);
    }

    this.draw = ( ctx ) => {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.tl.x,this.tl.y, this.width(), this.height());
    }
}

export { Rect }