

class Shader {

    vertexShader   = null;
    fragmentShader = null;
    shaderProgram  = null;

    constructor( vsSrc, fsSrc ) {
        this.vsSrc = String(vsSrc);
        this.fsSrc = String(fsSrc);        
    }

    /**
     * Load a shader into GPU from sources, return the shader or null if fails.
     * @param {WebGLRenderingContext} gl 
     * @param {gl.VERTEX_SHADER|gl.FRAGMENT_SHADER} type 
     * @param {string} src 
     * @returns 
     */
    _loadShader(gl, type, src) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, src);
        gl.compileShader(shader);

        if( !gl.getShaderParameter(shader, gl.COMPILE_STATUS) ) {
            console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shaders);
            return null;
        }
        return shader;
    }

    /**
     * 
     * @param {WebGLRenderingContext} gl 
     * @returns {}
     */
    load(gl) {

        // vertex shader
        this.vertexShader = this._loadShader(gl, gl.VERTEX_SHADER, this.vsSrc);
        if(!this.vertexShader) {
            alert("Unable to load vertex shader!");
            return null;
        }

        // fragment shader
        this.fragmentShader = this._loadShader(gl, gl.FRAGMENT_SHADER, this.fsSrc);
        if(!this.fragmentShader) {
            alert("Unable to load fragment shader!");
            return null;
        }

        // program

        this.shaderProgram = gl.createProgram();
        gl.attachShader(this.shaderProgram, this.vertexShader);
        gl.attachShader(this.shaderProgram, this.fragmentShader);
        gl.linkProgram(this.shaderProgram);
        
        if (!gl.getProgramParameter(this.shaderProgram, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(this.shaderProgram));
            this.shaderProgram = null;
            return null;
        }

        return this.shaderProgram;
    }
}

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
    // Clear the color buffer with shaderProgramfied clear color
    gl.clear(gl.COLOR_BUFFER_BIT);


    const vsSource = `
    attribute vec4 aVertexPosition;
    uniform mat4   uModelViewMatrix;
    uniform mat4   uProjectionMatrix;
    void main() {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    }
    `; // vsSource

    const fsSource = `
    void main() {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
    `; // fsSource

    const shader = new Shader(vsSource, fsSource);
    if( !shader.load(gl) ) {
        alert("Unable to load Shader!");
    }
}

window.onload = main;