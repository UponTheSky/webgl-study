# WebGL2 Fundamentals
- source: https://webgl2fundamentals.org/webgl/lessons/webgl-fundamentals.html

## Intro
- webgl is just a rasterization engine: just draws points, lines, and triangles
- webgl runs on the GPU, to draw those primitives
    - It is not the WebGL itself, but __shaders__ that draw pictures running on the GPU
    - __shader__: a function written in __GLSL__ that run on the GPU
    - in webgl we have __vertex shader__ and __fragment shader__, and these two functions form a pair called a __program__
        - vertex shader: compute vertex positions
        - getting the position value from the vertex shader, webgl rasterizes
        - during the rasterization, it calls fragment shader to compute color for each pixel, of the primitive currently being drawn
    
    - nearly all of the entire webgl API is about setting up state for these pairs of shaders to run
    - first, you set up a bunch of state
    - then execute those pairs of functions by calling `gl.drawArrays`, or `gl.drawElements`

- ways for a shader to access data
    1. attributes, buffers, and vertex arrays
        - __buffer__
            - an array of binary data you upload to the GPU, containing things like positions, texture coordinates, normals, vertex colors, etc.
            - buffers are not random access, but each time when a vertex shader executes, the next value from each specified buffer is pulled out and assigned to an attribute
        - __atrribute__ 
            - used to specify how to pull out of your buffers and provide them to your vertex shader
            - collected into a vertex array object(VAO)

    2. uniforms: global variables you set before you execute your shader program
    3. textures: arrays of data you can randomly access in your shader program
    4. varyings: a way for a vertex shader to pass data to a fragment shader

- buffer => attribute(wrapping the buffer) => vertex shader => fragment shader => rendered result

## WebGL Hello World
- vertex shader: clip space coordinates / fragment shader: color
- `#version 300 es` must be the very first line of your shader!

1. get the canvas context from the DOM API

2. prepare the shader source file

3. write functions which:
    - creates a shader
    - uploads the GLSL source
    - compile the shader
    - create a program
    - link two shaders

4. set up a state and provide data to our GLSL programs
    - create and bind a buffer
        - "bind"?
            - inside webgl, we have global bind points(that may be considered as global variables)
            - you bind your resource(buffer) to a bind point, and then all other functions refer to that resource through the bind point

    - put the actual data into the buffer through the bind point

    - look up the position of our attributes within the program(must be done during initialization)
    - set up a VAO, bind it to the current vertex array, and set up the attributes in the vertex array
        - turn the attribute on
        - specify how to pull the data out
        - (remark) `gl.vertexAttribPointer` binds the current `ARRAY_BUFFER` to the attribute

5. now set the viewport, and show the result!
    - set the viewport
    - clear the color

6. clipping space vs directly dealing with screen pixels
    - clipping space: [-1, 1]^2 => (0, 0) is the center
    - how to set a uniform var? -> look up its location!
    - webgl considers (0, 0) as the left bottom corner(we need to flip around the x-axis to make it the left top corner)