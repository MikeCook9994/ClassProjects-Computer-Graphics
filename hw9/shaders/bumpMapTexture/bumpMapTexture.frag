precision highp float;

varying vec3 fPosition;
varying vec3 fNormal;
varying vec2 fTextureCoordinate;	

uniform vec3 light;
uniform mat4 normalMatrix;
uniform sampler2D textureSampler;
uniform sampler2D bumpMapSampler;

vec2 BlinnPhongShading(vec3 surfaceNormal, float intensity, float ambientColor, float diffuseConstant, float specularConstant, float specularExp);

void main()
{
	float ambientColor = 0.1;
	float specularConstant = 2.0; 
	float diffuseConstant = 0.1;
	float specularExp = 50.0;
	float intensity = 3.0;

	vec3 displacedNormal = texture2D(bumpMapSampler, fTextureCoordinate).xyz;
	vec3 perturbedNormal = normalize(displacedNormal + fNormal);
	vec3 finalNormal = (normalMatrix * vec4(perturbedNormal, 0.0)).xyz;
	
	vec4 textureColor = texture2D(textureSampler, fTextureCoordinate);

	vec3 specularColor = BlinnPhongShading(finalNormal, 0.0, 0.0, 0.0, specularConstant, specularExp).y * vec3(1.0, 1.0, 1.0);
	vec3 ambientAndDiffuseColor = BlinnPhongShading(finalNormal, intensity, ambientColor, diffuseConstant, 0.0, 1.0).x * textureColor.xyz;

	gl_FragColor = vec4(ambientAndDiffuseColor + specularColor, 1.0);
}

vec2 BlinnPhongShading(vec3 surfaceNormal, float intensity, float ambientColor, float diffuseConstant, float specularConstant, float specularExp) {
	vec3 eye = normalize(-fPosition);
	vec3 lightVector = normalize(light);
	vec3 normal = normalize(surfaceNormal);
	vec3 halfVec = normalize((eye + lightVector) / length(eye + lightVector));

	float diffuseComponent = ambientColor + max(0.0, dot(lightVector, normal)) * intensity * diffuseConstant;
	float specularComponent = pow(max(0.0, dot(halfVec, normal)), specularExp) * intensity * specularConstant;
	return vec2(diffuseComponent, specularComponent);
}