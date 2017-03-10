precision highp float;

attribute vec3 position;
attribute vec3 color;
attribute vec3 normal;

uniform mat4 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec3 fNormal;
varying vec3 fPosition;
varying vec3 fColor;

void main()
{
  fNormal = normalize(normalMatrix * vec4(normal, 1.0)).xyz;
  vec4 pos = modelViewMatrix * vec4(position, 1.0);
  fPosition = pos.xyz;
  fColor = color;

  gl_Position = projectionMatrix * pos;
}