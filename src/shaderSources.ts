export const vertexShaderSource = `#version 300 es

// buffer => attribute => shader
// in vec4 a_position;

in vec2 a_position;
 
uniform vec2 u_resolution;

// all shaders have a main function
void main() {

    // gl_Position is a special variable a vertex shader is responsible for setting
    // gl_Position = a_position;

    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;
 
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
 
    // convert from 0->2 to -1->+1 (clip space)
    vec2 clipSpace = zeroToTwo - 1.0;
 
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
}
`;

export const fragmentShaderSource = `#version 300 es

// highp means "high precision"
precision highp float;
uniform vec4 u_color;

// output!
out vec4 outColor;

void main() {
    // outColor = vec4(1, 0, 0.5, 1);
    outColor = u_color;
}
`;

