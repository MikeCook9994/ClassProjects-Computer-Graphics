precision highp float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 textureCoordinates;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 fTextureCoordinate;
varying vec3 fPos;

mat3 transpose(mat3 matrix);

void main()
{
    // vec3 cameraSpaceNormal = mat3(modelViewMatrix) * normalize(normal);
    // vec3 cameraSpaceTangent = mat3(modelViewMatrix) * normalize(tangent);
    // vec3 cameraSpaceBitangent = mat3(modelViewMatrix) * normalize(bitangent);
    // fTBN = transpose(mat3(cameraSpaceTangent, cameraSpaceBitangent, cameraSpaceNormal));

    vec4 pos = modelViewMatrix * vec4(position, 1.0);
    fPos = -pos.xyz;

    fTextureCoordinate = textureCoordinates;
    
    gl_Position = projectionMatrix * pos;
}

mat3 transpose(mat3 matrix) {
    return mat3(
        vec3(matrix[0].x, matrix[1].x, matrix[2].x),
        vec3(matrix[0].y, matrix[1].y, matrix[2].y),
        vec3(matrix[0].z, matrix[1].z, matrix[2].z)
    );
}