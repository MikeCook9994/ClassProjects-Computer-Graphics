precision highp float;
attribute vec3 position;
attribute vec3 normal;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec3 fNormal;
varying vec3 fPosition;
varying vec3 vColor;

float rand(vec2 co);
vec3 ExtractCameraPos(mat4 a_modelView);

void main()
{
  fNormal = normalize(normalMatrix * normal);
  vec4 pos = modelViewMatrix * vec4(position, 1.0);
  fPosition = pos.xyz;
  
  float red = rand(pos.xy);
  float green = rand(pos.yz);
  float blue = rand(pos.xz);
  vColor = vec3(red, green, blue);
  
  gl_Position = projectionMatrix * pos;
}

// taken from so. Used to generate noise
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}