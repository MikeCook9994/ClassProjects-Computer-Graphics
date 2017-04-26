function Pipe(objectAttributes, vertexShaderSource, fragmentShaderSource) {
    let attributes = CreatePipeAttributes(objectAttributes);
    let uniformTemplate = CreatePipeUniformsTemplate();
    
    this.entityCollection = new EntityCollection(objectAttributes, vertexShaderSource, fragmentShaderSource, attributes, uniformTemplate);

    let entityCount = 2;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }      
}

Pipe.prototype.Draw = function(cameraTransform, projectionMatrix) {
    let modelTransform = m4.multiply(m4.scaling([15, 15, 15]), m4.translation([-140, 13.0, 0]));
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.entityCollection.UpdateUniformValues(0, [normalMatrix, modelViewMatrix, projectionMatrix, new Float32Array([0.282, 0.69, 0.0]), GetSunDirection()]);

    modelTransform = m4.multiply(m4.rotationZ(DegreesToRadians(270)), m4.multiply(m4.scaling([15, 15, 15]), m4.translation([-125, -272, 9.5])));
    modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.entityCollection.UpdateUniformValues(1, [normalMatrix, modelViewMatrix, projectionMatrix, new Float32Array([0.282, 0.69, 0.0]), GetSunDirection()]);

    this.entityCollection.Draw();
}

function CreatePipeUniformsTemplate() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "color", "light"];
    let uniformMatrixSpecifier = [true, true, true, false, false];
    let uniformCopyFunctions = [webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniform3fv"), webglApp.GetGLProperty("uniform3fv")];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreatePipeAttributes(objectAttributes) {
    let attributeNames = ["position", "normal"];
    let attributeValues = [new Float32Array(objectAttributes.vertices), new Float32Array(objectAttributes.vertexNormals)];
    let attributeSizes = [3, 3];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}