let basicVertexShader =
`precision highp float;

attribute vec3 position;
attribute vec3 color;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 fColor;

void main(void) {
    mat4 mvp = projectionMatrix * modelViewMatrix;
    gl_Position = mvp * vec4(position, 1.0);
    fColor = color;
}`

