let shadingVertexShader =
`precision highp float;

attribute vec3 position;
attribute vec3 normal;

uniform mat4 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 fNormal;
varying vec3 fPosition;

void main()
{
    fNormal = normalize((normalMatrix * vec4(normal, 0.0)).xyz);
    vec4 pos = modelViewMatrix * vec4(position, 1.0);
    fPosition = pos.xyz;

    gl_Position = projectionMatrix * pos;
}`

