precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 textureCoordindates;

uniform mat4 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 fNormal;
varying vec3 fPosition;
varying vec2 fTextureCoordinate;

void main()
{
    fNormal = normalize((normalMatrix * vec4(normal, 0.0)).xyz);
    vec4 pos = modelViewMatrix * vec4(position, 1.0);
    fPosition = pos.xyz;
    fTexCoord = textureCoordinates;

    gl_Position = projectionMatrix * pos;
}