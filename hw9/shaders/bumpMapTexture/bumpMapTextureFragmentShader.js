let bumpMapTextureFragmentShader =
`precision highp float;

varying vec3 fPosition;
varying vec3 fNormal;
varying vec2 fTextureCoordinate;	

uniform vec3 light;
uniform mat4 normalMatrix;
uniform sampler2D textureSampler;
uniform sampler2D bumpMapSampler;

float ComputeLightingModifier();

void main()
{
	vec3 displacedNormal = texture2D(bumpMapSampler, fTextureCoordinate).xyz;
	vec3 perturbedNormal = normalize(displacedNormal + fNormal);
	vec3 finalNormal = (normalMatrix * vec4(perturbedNormal, 0.0)).xyz;
	float lightingModifier = ComputeLightingModifier(light, finalNormal);
	vec4 textureColor = texture2D(textureSampler, fTextureCoordinate);
	gl_FragColor = vec4(textureColor.xyz * lightingModifier, textureColor.a);
}

float ComputeLightingModifier(vec3 lightVector, vec3 surfaceNormal) {
	vec3 eye = normalize(-fPosition);
	vec3 lightVector = normalize(light);
	vec3 normal = normalize(surfaceNormal);
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

