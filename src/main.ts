const main = () => {
    const canvas = document.querySelector<HTMLCanvasElement>('#glCanvas');
    const gl = canvas.getContext("webgl");

    if (gl === null) {
        alert("no WebGL...");
        return;
    }

    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

window.onload = main;
