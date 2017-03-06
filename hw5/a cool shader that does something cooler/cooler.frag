precision highp float;
uniform float time;
uniform vec2 resolution;
uniform vec3 light;
varying vec3 fPosition;
varying vec3 fNormal;
varying vec3 localPos;
varying vec3 vColor;

float ComputeLightingModifier();
float Grid(float val, float dst);
float rand(vec2 co);

void main()
{
  vec3 color = vec3(0.8, 0.2, 0.2);
  float lightingModifier = ComputeLightingModifier();
  
  float noise = Grid(localPos.x, 5.0) + Grid(localPos.y, 5.0) + Grid(localPos.z, 5.0);
  float strip = Grid(localPos.x + localPos.y, 50.0) + Grid(localPos.x + localPos.z, 50.0);
  if(localPos.z > 0.0) {
    if(localPos.x > 0.0 && localPos.y > 0.0) {
      if(mod(noise, 2.0) > 0.0) {
        color.y = rand(fPosition.yz);
        color.z = rand(fPosition.xz);
      }
    }
    else if(localPos.x < 0.0 && localPos.y > 0.0) {
      if(strip > .5) {
        discard;
      }
    }
    else if(localPos.x < 0.0 && localPos.y < 0.0) {
      color.x = vColor.x;
      color.y = vColor.y;
      color.z = vColor.z;
    }    
    else {
      
    }
  }
  else {
    if(localPos.x > 0.0 && localPos.y > 0.0) {
      color.x = vColor.x;
      color.y = vColor.y;
      color.z = vColor.z;
    }
    else if(localPos.x < 0.0 && localPos.y > 0.0) {
      if(mod(noise, 2.0) > 0.0) {
        color.y = rand(fPosition.yz);
        color.z = rand(fPosition.xz);
      }
    }
    else if(localPos.x < 0.0 && localPos.y < 0.0) {
        
    }
    else {
      if(strip > .5) {
        discard;
      }
    }
  }
  
  gl_FragColor = vec4(color * lightingModifier, 1.0);
}

float ComputeLightingModifier() {
  vec3 light = normalize(vec3(1.0, 1.0, 1.0));
  vec3 eye = normalize(-fPosition);
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
}

float Grid(float val, float dst) {
  return floor(mod(val*dst,1.0)+.5);
}

// a common glsl one liner for generting some sort of pseudorandom number
float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}