function Ground(objectAttributes, vertexShader, fragmentShader) {
    this.objectAttributes = objectAttributes;

    let attributes = CreateGroundAttributes(this.objectAttributes);
    let uniformTemplate = CreateGroundUniformTemplate();

    this.entityCollection = new EntityCollection(objectAttributes, vertexShader, fragmentShader, attributes, uniformTemplate);

    let entityCount = 60;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }
}

Ground.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let entityId = 0;
    for(let height = -1; height < 1; height++) {
        for(let depth = -1; depth < 2; depth++) {
            for(let width = -5; width < 5; width++) {
                let modelTransform = m4.multiply(m4.translation([2.2 * (depth), 2.2 * (height) , 2.2 * (width)]), m4.scaling([10, 10, 10]));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, new Float32Array([0.54, 0.27, 0.07])]);
                entityId++;
            }
        }
    }
    this.entityCollection.Draw();
}

function CreateGroundUniformTemplate() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "color"];
    let uniformMatrixSpecifier = [true, true, true, false];
    let uniformCopyFunctions = [glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniform3fv];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreateGroundAttributes(objectAttributes) {
    let attributeNames = ["position", "normal"];
    let attributeValues = [new Float32Array(objectAttributes.vertices), new Float32Array(objectAttributes.vertexNormals)];
    let attributeSizes = [3, 3];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}