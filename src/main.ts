import { vertexShaderSource, fragmentShaderSource } from './shaderSources';
import { createShader } from './createShader';
import { createProgram } from './createProgram';
import { setRectangle, randomInt } from './setRectangle';

const CANVAS_ID = 'glCanvas';

const main = () => {
    const canvas = document.querySelector<HTMLCanvasElement>(`#${CANVAS_ID}`);
    const gl = canvas?.getContext("webgl2");

    if (gl === null || gl === undefined) {
        alert("no WebGL...");
        return;
    }

    // create shader and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    const program = createProgram(gl, vertexShader, fragmentShader);

    // create & bind a buffer, and add the actual data to the buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    // const positions = [
    //     0, 0,
    //     0, 0.5, 
    //     0.7, 0
    // ];

    const positions = [
        10, 20,
        80, 20,
        10, 30,
        10, 30,
        80, 20,
        80, 30,
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // create a vertex array object, bind it to the current array
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // turn on the attribute in the program
    // locate the attribute
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionAttributeLocation);

    // specify how the attribute pull the data out of the buffer
    const size = 2; // two components per iteration
    const type = gl.FLOAT; // the data type
    const normalize = false; // normalize or not
    const stride = 0; // 0 = move forward size * sizeof(type)
    const offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);

    // set the viewport
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // clear the canvas
    gl.clearColor(0, 0, 0, 0); // specifies what color to use when gl.clear() is called
    gl.clear(gl.COLOR_BUFFER_BIT); // clear the color buffer

    // execute the program
    gl.useProgram(program);

    // set the uniform var => first figure out its location
    const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
    gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

    // generate multiple rectangles
    const colorLocation = gl.getUniformLocation(program, "u_color");
 
    // draw 50 random rectangles in random colors
    for (var _ = 0; _ < 50; ++_) {
        // Setup a random rectangle
        setRectangle(
            gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300));
    
        // Set a random color.
        gl.uniform4f(colorLocation, Math.random(), Math.random(), Math.random(), 1);
 
        // Draw the rectangle.
        const primitiveType = gl.TRIANGLES;
        const offset = 0;
        const count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }
 
    // // draw!
    // const primitiveType = gl.TRIANGLES; // draw triangle
    // const drawOffset = 0; // the starting point in the buffer
    // // const drawCount = 3;  // the vertex shader will be called three times
    // const drawCount = 6;

    // gl.drawArrays(primitiveType, drawOffset, drawCount);
}

const createCanvasTag = () => {
    const canvasTag = document.createElement('canvas');
    canvasTag.id = CANVAS_ID;
    canvasTag.width = 640;
    canvasTag.height = 480;

    return canvasTag;
}

document.body.appendChild(createCanvasTag());
window.onload = main;
