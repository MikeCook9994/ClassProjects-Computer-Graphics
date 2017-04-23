precision highp float;

varying vec2 fTextureCoordinate;	
varying vec3 fPos;

uniform mat4 normalMatrix;
uniform sampler2D textureSampler;
uniform sampler2D bumpMapSampler;
uniform vec3 light;

vec2 BlinnPhongShading(vec3 surfaceNormal, float intensity, float ambientColor, float diffuseConstant, float specularConstant, float specularExp);

void main()
{
	float ambientColor = 0.1;
	float specularConstant = 2.0; 
	float diffuseConstant = 0.1;
	float specularExp = 50.0;
	float intensity = 3.0;

	vec3 normal = normalize(((texture2D(bumpMapSampler, fTextureCoordinate).rgb) * 2.0) - 1.0);
	
	vec4 textureColor = texture2D(textureSampler, fTextureCoordinate);

	vec3 specularColor = BlinnPhongShading(normal, 0.0, 0.0, 0.0, specularConstant, specularExp).y * vec3(1.0, 1.0, 1.0);
	vec3 ambientAndDiffuseColor = BlinnPhongShading(normal, intensity, ambientColor, diffuseConstant, 0.0, 1.0).x * textureColor.rgb;

	gl_FragColor = vec4(ambientAndDiffuseColor + specularColor, 1.0);
}

vec2 BlinnPhongShading(vec3 surfaceNormal, float intensity, float ambientColor, float diffuseConstant, float specularConstant, float specularExp) {
	vec3 eye = normalize(-fPos);
	vec3 lightVector = normalize(light);
	vec3 normal = normalize(surfaceNormal);
	vec3 halfVec = normalize((eye + lightVector) / length(eye + lightVector));

	float diffuseComponent = ambientColor + max(0.0, dot(lightVector, normal)) * intensity * diffuseConstant;
	float specularComponent = pow(max(0.0, dot(halfVec, normal)), specularExp) * intensity * specularConstant;
	return vec2(diffuseComponent, specularComponent);
}