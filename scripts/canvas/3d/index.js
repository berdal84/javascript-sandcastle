
const mat4 = glMatrix.mat4;

class Renderer {

    /**
     * Clear the context
     * @param {WebGLRenderingContext} gl 
     */
    static clear(gl) {
        gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
        gl.clearDepth(1.0);                 // Clear everything
        gl.enable(gl.DEPTH_TEST);           // Enable depth testing
        gl.depthFunc(gl.LEQUAL);            // Near things obscure far things
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    /**
     * 
     * @param {WebGLRenderingContext} gl 
     * @param {*} programInfo 
     * @param {Plane} plane 
     */
    static drawPlane(gl, programInfo, plane) {

        plane.load(gl);
      
        // Create a perspective matrix, a special matrix that is
        // used to simulate the distortion of perspective in a camera.
        // Our field of view is 45 degrees, with a width/height
        // ratio that matches the display size of the canvas
        // and we only want to see objects between 0.1 units
        // and 100 units away from the camera.
      
        const fieldOfView = 45 * Math.PI / 180;   // in radians
        const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = mat4.create();
      
        // note: glmatrix.js always has the first argument
        // as the destination to receive the result.
        mat4.perspective(projectionMatrix,
                         fieldOfView,
                         aspect,
                         zNear,
                         zFar);
      
        // Set the drawing position to the "identity" point, which is
        // the center of the scene.
        const modelViewMatrix = mat4.create();
      
        // Now move the drawing position a bit to where we want to
        // start drawing the square.
      
        mat4.translate(modelViewMatrix,     // destination matrix
                       modelViewMatrix,     // matrix to translate
                       [-0.0, 0.0, -6.0]);  // amount to translate
      
        // Tell WebGL how to pull out the positions from the position
        // buffer into the vertexPosition attribute.
        {
          const numComponents = 2;  // pull out 2 values per iteration
          const type = gl.FLOAT;    // the data in the buffer is 32bit floats
          const normalize = false;  // don't normalize
          const stride = 0;         // how many bytes to get from one set of values to the next
                                    // 0 = use type and numComponents above
          const offset = 0;         // how many bytes inside the buffer to start from
          gl.bindBuffer(gl.ARRAY_BUFFER, plane.buffers.position);
          gl.vertexAttribPointer(
              programInfo.attribLocations.vertexPosition,
              numComponents,
              type,
              normalize,
              stride,
              offset);
          gl.enableVertexAttribArray(
              programInfo.attribLocations.vertexPosition);
        }
      
        // Tell WebGL to use our program when drawing
      
        gl.useProgram(programInfo.program);
      
        // Set the shader uniforms
      
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix);
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix);
      
        {
          const offset = 0;
          const vertexCount = plane.vertexCount;
          gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
        }
    }
}

class Plane {

    vertexCount = null;
    buffers = {
        position: null
    }

    constructor() {}

    /**
     * load plane buffers into gl context
     * @param {WebGLRenderingContext} gl 
     * @returns {{position: WebGLBuffer}}
     */
    load(gl) {

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      
        // Now create an array of positions for the square.      
        const positions = [
           1.0,  1.0,
          -1.0,  1.0,
           1.0, -1.0,
          -1.0, -1.0,
        ];
      
        this.vertexCount = 4;

        // Now pass the list of positions into WebGL to build the
        // shape. We do this by creating a Float32Array from the
        // JavaScript array, then use it to fill the current buffer.      
        gl.bufferData(gl.ARRAY_BUFFER,
                      new Float32Array(positions),
                      gl.STATIC_DRAW);
      
        this.buffers.position = positionBuffer;

        return this.buffers;
    }
}

class Shader {

    vertexShader   = null;
    fragmentShader = null;
    program        = null;

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

        this.program = gl.createProgram();
        gl.attachShader(this.program, this.vertexShader);
        gl.attachShader(this.program, this.fragmentShader);
        gl.linkProgram(this.program);
        
        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(this.program));
            this.program = null;
            return null;
        }

        return this.program;
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

    const programInfo = {
        program: shader.program,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shader.program, 'aVertexPosition'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shader.program, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shader.program, 'uModelViewMatrix'),
        },
    };

    const plane = new Plane();
    Renderer.clear(gl);
    Renderer.drawPlane(gl, programInfo, plane);
}

window.onload = main;