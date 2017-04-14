function UndergroundBrick(objectAttributes, vertexShader, fragmentShader, textureImageSources) {
    let attributes = CreateUndergroundBrickAttributes(objectAttributes);
    let uniformTemplate = CreateUndergroundBrickUniformTemplate();

    this.entityCollection = new EntityCollection(objectAttributes, vertexShader, fragmentShader, attributes, uniformTemplate);

    let entityCount = 90;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }

    this.entityCollection.SetupTextures(textureImageSources);        
}

UndergroundBrick.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let entityId = 0;
    for(let height = -1; height < 1; height++) {
        for(let depth = -7; depth < 8; depth++) {
            for(let width = -1; width < 2; width++) {
                let modelTransform = m4.multiply(m4.translation([2.2 * (depth), 2.2 * (height) , 2.2 * (width)]), m4.multiply(m4.rotationY(DegreesToRadians(180)), m4.scaling([10, 10, 10])));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, 0]);
                entityId++;
            }
        }
    }
    this.entityCollection.Draw();
}

function CreateUndergroundBrickUniformTemplate() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "textureSampler"];
    let uniformMatrixSpecifier = [true, true, true, false];
    let uniformCopyFunctions = [glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniform1i];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreateUndergroundBrickAttributes(objectAttributes) {
    let attributeNames = ["position", "normal", "textureCoordinates"];
    let attributeValues = [
        new Float32Array(objectAttributes.vertices), 
        new Float32Array(objectAttributes.vertexNormals),
        new Float32Array(objectAttributes.vertexTextureCoordinates)
    ];
    let attributeSizes = [3, 3, 2];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}