let basicFragmentShader =
`precision highp float;
uniform float time;
uniform vec2 resolution;

varying vec3 fPosition;
varying vec3 fNormal;
varying vec3 localPos;

float ComputeLightingModifier();

void main()
{
  vec3 color = vec3(0.8, 0.2, 0.2);
  float lightingModifier = ComputeLightingModifier();
  
  gl_FragColor = vec4(color * lightingModifier, 1.0);
}

float ComputeLightingModifier() {
  vec3 eye = normalize(-fPosition);
  vec3 light = normalize(vec3(1.0, 1.0, 1.0));
  vec3 normal = normalize(fNormal);
  vec3 halfVec = normalize((eye + light) / length(eye + light));
  float ambientColor = 0.1;
  float specularConstant = 2.0; 
  float diffuseConstant = 0.1;
  float specularExp = 50.0;
  float intensity = 3.0;
  
  float diffuseComponent = max(0.0, dot(light, normal)) * intensity * diffuseConstant;
  float specularComponent = pow(max(0.0, dot(halfVec, normal)), specularExp) * intensity * specularConstant;
  float ambientComponent = ambientColor * intensity;
  return (diffuseComponent + specularComponent + ambientComponent);
}`

