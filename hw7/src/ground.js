function Ground(glHost, objectAttributes, vertexShader, fragmentShader) {
    this.objectAttributes = objectAttributes;
    this.entityCount = 60;

    let attributes = CreateGroundAttributes(this.objectAttributes);

    this.entityCollection = new EntityCollection(glHost, objectAttributes, vertexShader, fragmentShader, attributes);

    for(let i = 0; i < this.entityCount; i++) {
        this.entityCollection.CreateEntity(CreateGroundUniform(glHost));
    }
}

Ground.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let i = 0;
    for(let j = -1; j < 1; j++) {
        for(let k = -1; k < 2; k++) {
            for(let l = -5; l < 5; l++) {
                let modelTransform = m4.multiply(m4.translation([2.2 * (k), 2.2 * (j) , 2.2 * (l)]), m4.scaling([10, 10, 10]));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.CopyUniformValues(i, [normalMatrix, modelViewMatrix, projectionMatrix, new Float32Array([0.54, 0.27, 0.07])]);
                i++;
            }
        }
    }
    this.entityCollection.Draw();
}

function CreateGroundUniform(glHost) {
    let groundUniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "color"];
    let groundUniformMatrixBooleans = [true, true, true, false];
    let groundUniformCopyFunctions = [glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniform3fv];
    return CreateUniforms(groundUniformNames, groundUniformMatrixBooleans, groundUniformCopyFunctions);
}

function CreateGroundAttributes(objectAttributes) {
    let attributeNames = ["position", "normal"];
    let attributeValues = [new Float32Array(objectAttributes.vertices), new Float32Array(objectAttributes.vertexNormals)];
    return CreateAttributes(attributeNames, attributeValues);
}