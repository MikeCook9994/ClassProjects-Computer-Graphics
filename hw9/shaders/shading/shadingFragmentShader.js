let shadingFragmentShader =
`precision highp float;

uniform vec3 light;
uniform vec3 color;

varying vec3 fPosition;
varying vec3 fNormal;

float ComputeLightingModifier();

void main()
{
	float lightingModifier = ComputeLightingModifier();
	gl_FragColor = vec4(color * lightingModifier, 1.0);
}

float ComputeLightingModifier() {
	vec3 eye = normalize(-fPosition);
	vec3 lightVector = normalize(light);
	vec3 normal = normalize(fNormal);
	vec3 halfVec = normalize((eye + lightVector) / length(eye + lightVector));
	float ambientColor = 0.1;
	float specularConstant = 2.0; 
	float diffuseConstant = 0.1;
	float specularExp = 50.0;
	float intensity = 3.0;

	float diffuseComponent = max(0.0, dot(lightVector, normal)) * intensity * diffuseConstant;
	float specularComponent = pow(max(0.0, dot(halfVec, normal)), specularExp) * intensity * specularConstant;
	float ambientComponent = ambientColor * intensity;
	return (diffuseComponent + specularComponent + ambientComponent);
}`

