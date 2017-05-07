precision highp float;

varying vec2 fTextureCoordinate;	
varying vec3 fPos;
varying vec3 fLight;

uniform mat4 normalMatrix;
uniform sampler2D textureSampler;
uniform sampler2D bumpMapSampler;
uniform sampler2D specularMapSampler;

vec2 BlinnPhongShading(vec3 surfaceNormal, float intensity, float ambientColor, float diffuseConstant, float specularConstant, float specularExp);

void main()
{
	vec4 textureColor = texture2D(textureSampler, fTextureCoordinate);
	vec4 specularDetails = texture2D(specularMapSampler, fTextureCoordinate);
	vec3 normal = normalize(((texture2D(bumpMapSampler, fTextureCoordinate).rgb) * 2.0) - 1.0);
	
	float ambientColor = 0.1;
	float specularConstant = 2.0; 
	float diffuseConstant = 0.1;
	float specularExp = specularDetails.a;
	float intensity = 1.0;

	vec2 lightingModifiers = BlinnPhongShading(normal, intensity, ambientColor, diffuseConstant, specularConstant, specularExp);

	gl_FragColor = vec4((lightingModifiers.x * textureColor.rgb) + (specularDetails.rgb * lightingModifiers.y), 1.0);
}

vec2 BlinnPhongShading(vec3 surfaceNormal, float intensity, float ambientColor, float diffuseConstant, float specularConstant, float specularExp) {
	vec3 eye = normalize(-fPos);
	vec3 lightVector = normalize(fLight);
	vec3 normal = normalize(surfaceNormal);
	vec3 halfVec = normalize((eye + lightVector) / length(eye + lightVector));

	float ambientComponent = intensity * ambientColor;
	float diffuseComponent = max(0.0, dot(lightVector, normal)) * intensity * diffuseConstant;
	float specularComponent = pow(max(0.0, dot(halfVec, normal)), specularExp) * intensity * specularConstant;
	return vec2(diffuseComponent + ambientComponent, specularComponent);
}