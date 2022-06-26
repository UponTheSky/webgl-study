export const createProgram = (
    gl: WebGL2RenderingContext, 
    vertexShader: WebGLShader, 
    fragmentShader: WebGLShader
) => {

    // create a program
    const program = gl.createProgram();
    if (!program) {
        throw new Error("A program cannot be generated");
    }

    // attach two different shaders, and link
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);

    throw new Error("creating a new program has not been successful");
}
