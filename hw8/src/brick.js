function Brick(objectAttributes, vertexShader, fragmentShader, textureImageSources) {
    let attributes = CreateBrickAttributes(objectAttributes);
    let uniformTemplate = CreateBrickUniformTemplate();

    this.entityCollection = new EntityCollection(objectAttributes, vertexShader, fragmentShader, attributes, uniformTemplate);

    let entityCount = 5;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }

    this.entityCollection.SetupTextures(textureImageSources);        
}

Brick.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let entityId = 0;
    for(let height = 4; height < 5; height++) {
        for(let depth = -2; depth < 3; depth++) {
            for(let width = -1; width < 0; width++) {
                let modelTransform = m4.multiply(m4.translation([2.0 * (depth), 2.0 * (height) , .9 * (width)]), m4.scaling([10, 10, 10]));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, 0]);
                entityId++;
            }
        }
    }
    this.entityCollection.Draw();
}

function CreateBrickUniformTemplate() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "textureSampler"];
    let uniformMatrixSpecifier = [true, true, true, false];
    let uniformCopyFunctions = [glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniform1i];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreateBrickAttributes(objectAttributes) {
    let attributeNames = ["position", "normal", "textureCoordinates"];
    let attributeValues = [
        new Float32Array(objectAttributes.vertices), 
        new Float32Array(objectAttributes.vertexNormals),
        new Float32Array(objectAttributes.vertexTextureCoordinates)
    ];
    let attributeSizes = [3, 3, 2];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}