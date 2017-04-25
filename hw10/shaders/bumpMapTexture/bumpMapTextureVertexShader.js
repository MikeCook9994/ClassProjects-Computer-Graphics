let bumpMapTextureVertexShader =
`precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec3 tangent;
attribute vec3 bitangent;
attribute vec2 textureCoordinates;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform vec3 light;

varying vec2 fTextureCoordinate;
varying vec3 fPos;
varying vec3 fLight;

mat3 transpose(mat3 matrix);

void main()
{
    vec3 cameraSpaceNormal = mat3(modelViewMatrix) * normalize(normal);
    vec3 cameraSpaceTangent = mat3(modelViewMatrix) * normalize(tangent);
    vec3 cameraSpaceBitangent = mat3(modelViewMatrix) * normalize(bitangent);
    mat3 TBN = transpose(mat3(cameraSpaceTangent, cameraSpaceBitangent, cameraSpaceNormal));

    vec4 pos = modelViewMatrix * vec4(position, 1.0);
    fPos = TBN * -pos.xyz;

    fTextureCoordinate = textureCoordinates;
    fLight = TBN * light;
    
    gl_Position = projectionMatrix * pos;
}

mat3 transpose(mat3 matrix) {
    return mat3(
        vec3(matrix[0].x, matrix[1].x, matrix[2].x),
        vec3(matrix[0].y, matrix[1].y, matrix[2].y),
        vec3(matrix[0].z, matrix[1].z, matrix[2].z)
    );
}`

