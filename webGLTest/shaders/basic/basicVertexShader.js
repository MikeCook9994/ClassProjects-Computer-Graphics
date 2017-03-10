let basicVertexShader =
`attribute vec3 vPosition;
attribute vec3 vColor;
varying vec3 fColor;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

void main(void) {
    mat4 mvp = projectionMatrix * modelViewMatrix;
    gl_Position = mvp * vec4(vPosition, 1.0);
    fColor = vColor;
}`

