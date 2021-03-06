precision highp float;

varying vec3 fPosition;
varying vec3 fNormal;
varying vec2 fTextureCoordinate;	

uniform vec3 light;
uniform sampler2D textureSampler;

float ComputeLightingModifier();

void main()
{
	float lightingModifier = ComputeLightingModifier();
	vec4 textureColor = texture2D(textureSampler, fTextureCoordinate);
	gl_FragColor = vec4(textureColor.xyz * lightingModifier, textureColor.a);
}

float ComputeLightingModifier() {
	vec3 eye = normalize(-fPosition);
	vec3 lightVector = normalize(light);
	vec3 normal = normalize(fNormal);
	vec3 halfVec = normalize((eye + lightVector) / length(eye + lightVector));
	float ambientColor = 0.3;
	float specularConstant = 0.0; 
	float diffuseConstant = 0.0;
	float specularExp = 50.0;
	float intensity = 3.0;

	float diffuseComponent = max(0.0, dot(lightVector, normal)) * intensity * diffuseConstant;
	float specularComponent = pow(max(0.0, dot(halfVec, normal)), specularExp) * intensity * specularConstant;
	float ambientComponent = ambientColor * intensity;
	return (diffuseComponent + specularComponent + ambientComponent);
}