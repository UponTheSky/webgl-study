export const setGeometry = (gl: WebGL2RenderingContext) => {
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
            0, -100,
            150, 125, 
            -175, 100
        ]),
        gl.STATIC_DRAW
    );
}
