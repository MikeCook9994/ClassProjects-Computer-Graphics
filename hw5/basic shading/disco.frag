precision highp float;
uniform float time;
uniform vec2 resolution;
varying vec3 fPosition;
varying vec3 fNormal;
varying vec3 vColor;

void main()
{
  vec3 eye = normalize(-fPosition);
  vec3 light = normalize(vec3(1.0, 1.0, 1.0));
  vec3 normal = normalize(fNormal);
  vec3 halfVec = normalize((eye + light) / length(eye + light));
  float ambientColor = .5;
  float specularExp = 20.0;
  float intensity = 2.0;
  
  float diffuseComponent = max(0.0, dot(light, normal)) * intensity;
  float specularComponent = pow(max(0.0, dot(halfVec, normal)), specularExp) * intensity;  
  float ambientComponent = ambientColor * intensity;
  
  float red = vColor.x * (diffuseComponent + specularComponent + ambientComponent);
  float green = vColor.y * (diffuseComponent + specularComponent + ambientComponent);
  float blue = vColor.z * (diffuseComponent + specularComponent + ambientComponent);
  
  gl_FragColor = vec4(red, green, blue, 1.0);
}