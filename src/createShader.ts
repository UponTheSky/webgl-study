export const createShader = (gl: WebGL2RenderingContext, type: GLenum, source: string) => {
    // create a shader
    const shader = gl.createShader(type);

    if (!shader) {
        throw new Error("cannot create a shader");
    }

    // provide the shader source it needs
    gl.shaderSource(shader, source);

    // compile the shader
    gl.compileShader(shader);

    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (success) {
        console.log("ssssss") 
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    throw new Error("creating a shader has not been successful");
}
