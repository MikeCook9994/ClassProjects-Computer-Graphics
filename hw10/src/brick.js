function Brick(objectAttributes, vertexShader, fragmentShader, textureImageSources) {
    let attributes = CreateBrickAttributes(objectAttributes);
    let uniformTemplate = CreateBrickUniformTemplate();

    this.entityCollection = new EntityCollection(objectAttributes, vertexShader, fragmentShader, attributes, uniformTemplate);

    let entityCount = 5;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }

    this.textureSamplerNumbers = this.entityCollection.SetupTextures(textureImageSources);
}

Brick.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let entityId = 0;
    for(let height = 4; height < 5; height++) {
        for(let depth = -2; depth < 3; depth++) {
            for(let width = -1; width < 0; width++) {
                let modelTransform = m4.multiply(m4.translation([2.2* (depth), 2.2 * (height) , -1.0 * (width)]), m4.scaling([10, 10, 10]));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], this.textureSamplerNumbers[1], GetSunDirection()]);
                entityId++;
            }
        }
    }
    this.entityCollection.Draw();
}

function CreateBrickUniformTemplate() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "textureSampler", "bumpMapSampler", "light"];
    let uniformMatrixSpecifier = [true, true, true, false, false, false];
    let uniformCopyFunctions = [webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform3fv")];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreateBrickAttributes(objectAttributes) {
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