function Platforms(objectAttributes, vertexShader, fragmentShader, textureImageSources) {
    let attributes = CreatePlatformsAttributes(objectAttributes);
    let uniformTemplate = CreatePlatformsUniformTemplate();

    this.entityCollection = new EntityCollection(objectAttributes, vertexShader, fragmentShader, attributes, uniformTemplate);

    let entityCount = 1;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }

    this.textureSamplerNumbers = this.entityCollection.SetupTextures(textureImageSources);        
}

Platforms.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let entityId = 0;
    let modelTransform = m4.multiply(m4.scaling([7, 7, 7]), m4.multiply(m4.rotationY(DegreesToRadians(90)), m4.translation([0, 20, 0])));
    let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);

    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
    this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], this.textureSamplerNumbers[1], this.textureSamplerNumbers[2], GetSunDirection()]);
    this.entityCollection.Draw();
}

function CreatePlatformsUniformTemplate() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "textureSampler", "bumpMapSampler", "specularMapSampler", "light"];
    let uniformMatrixSpecifier = [true, true, true, false, false, false, false];
    let uniformCopyFunctions = [webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform3fv")];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreatePlatformsAttributes(objectAttributes) {
    ComputeTangentBasis(objectAttributes);
    let attributeNames = ["position", "normal", "tangent", "bitangent", "textureCoordinates"];
    let attributeValues = [
        new Float32Array(objectAttributes.vertices), 
        new Float32Array(objectAttributes.vertexNormals),
        new Float32Array(objectAttributes.vertexTangents),
        new Float32Array(objectAttributes.vertexBitangents),
        new Float32Array(objectAttributes.vertexTextureCoordinates)
    ];
    let attributeSizes = [3, 3, 3, 3, 2];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}