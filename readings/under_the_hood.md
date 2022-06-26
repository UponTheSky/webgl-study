# WebGL2 How It Works
- source: https://webgl2fundamentals.org/webgl/lessons/webgl-how-it-works.html

## 1. Vertex Shader

1. first, a vertex is provided to the attribute, through which the vertex shader reads the vertex data
2. then, the shader makes some computation, including transforming the vertex data into a point in the clip space
3. the clip space data is handed over to `gl_Position` variable in the shader

## 2. Fragment Shader

1. upon being provided the vertice info, the GPU figures out which pixels are to be drawn
2. for each of those pixels, the fragment shader tells the GPU the color it wants to draw
3. we can specify more info to the fragment shader via "varying" from the vertex shader => done by `out` variable