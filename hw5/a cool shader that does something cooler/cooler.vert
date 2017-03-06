precision highp float;
attribute vec3 position;
attribute vec3 normal;
uniform float time;
uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
varying vec3 fNormal;
varying vec3 fPosition;
varying vec3 localPos;
varying vec3 vColor;
const float PI = 3.14159;

float Rand(vec2 co);
mat4 RotationMatrix(vec3 axis, float angle);

void main()
{
  fNormal = normalize(normalMatrix * normal);
  mat4 xRotationMatrix = RotationMatrix(vec3(1.0, 0.0, 0.0), mod(time, PI / 2.0) * 10.0);
  if(position.x < 0.0) {
    xRotationMatrix = RotationMatrix(vec3(1.0, 0.0, 0.0), mod(time, PI / 2.0) * -10.0);
  }
  
  mat4 yRotationMatrix = RotationMatrix(vec3(0.0, 1.0, 0.0), mod(time, PI / 2.0) * 8.0);
  mat4 zRotationMatrix = RotationMatrix(vec3(0.0, 0.0, 1.0), mod(time, PI / 2.0) * 8.0);
  
  vec4 pos = modelViewMatrix * zRotationMatrix* yRotationMatrix * xRotationMatrix* vec4(position, 1.0);
  
  fPosition = pos.xyz;
  localPos = position;
  vColor.x = Rand(position.xy);
  vColor.y = Rand(position.yz);
  vColor.z = Rand(position.xz);

  gl_Position = projectionMatrix * pos;
}

float Rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

mat4 RotationMatrix(vec3 axis, float angle)
{
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c, oc * axis.x * axis.y - axis.z * s, oc * axis.z * axis.x + axis.y * s, 0.0,
                oc * axis.x * axis.y + axis.z * s, oc * axis.y * axis.y + c, oc * axis.y * axis.z - axis.x * s, 0.0,
                oc * axis.z * axis.x - axis.y * s, oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c, 0.0,
                0.0, 0.0, 0.0, 1.0);
}