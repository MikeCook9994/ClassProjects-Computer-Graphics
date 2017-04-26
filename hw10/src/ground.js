function Ground(objectAttributes, vertexShader, fragmentShader, textureImageSources) {
    let attributes = CreateGroundAttributes(objectAttributes);
    let uniformTemplate = CreateGroundUniformTemplate();

    this.entityCollection = new EntityCollection(objectAttributes, vertexShader, fragmentShader, attributes, uniformTemplate);

    let entityCount = 90;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }

    this.textureSamplerNumbers = this.entityCollection.SetupTextures(textureImageSources);        
}

Ground.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let entityId = 0;
    for(let height = -1; height < 1; height++) {
        for(let depth = -7; depth < 8; depth++) {
            for(let width = -1; width < 2; width++) {
                let modelTransform = m4.multiply(m4.translation([2.2 * (depth), 2.2 * (height) , 2.2 * (width)]), m4.multiply(m4.rotationY(DegreesToRadians(180)), m4.scaling([10, 10, 10])));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], this.textureSamplerNumbers[1], this.textureSamplerNumbers[2], GetSunDirection()]);
                entityId++;
            }
        }
    }
    this.entityCollection.Draw();
}

function CreateGroundUniformTemplate() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "textureSampler", "bumpMapSampler", "specularMapSampler", "light"];
    let uniformMatrixSpecifier = [true, true, true, false, false, false, false];
    let uniformCopyFunctions = [webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform3fv")];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreateGroundAttributes(objectAttributes) {
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