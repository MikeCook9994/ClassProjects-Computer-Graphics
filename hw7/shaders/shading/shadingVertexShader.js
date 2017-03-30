let shadingVertexShader =
`precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec3 barycentric;

uniform mat4 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 fNormal;
varying vec3 fPosition;
varying vec3 fColor;
varying vec3 fbarycentric;

void main()
{
    fNormal = normalize((normalMatrix * vec4(normal, 0.0)).xyz);
    vec4 pos = modelViewMatrix * vec4(position, 1.0);
    fPosition = pos.xyz;
    fColor = vec3(0.0, 1.0, 0.0);
    fbarycentric = barycentric;

    gl_Position = projectionMatrix * pos;
}`

