function UndergroundBackground(objectAttributes, vertexShaderSource, fragmentShaderSource) {
    let attributes = CreateUndergroundBackgroundAttributes(objectAttributes);
    let uniformTemplate = CreateUndergroundBackgroundUniformTemplate();

    this.entityCollection = new EntityCollection(objectAttributes, vertexShaderSource, fragmentShaderSource, attributes, uniformTemplate);

    let entityCount = 2;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }
}

UndergroundBackground.prototype.Draw = function(cameraTransform, projectionMatrix) {
    let modelTransform = m4.multiply(m4.scaling([200, 157, 1]), m4.translation([-40, -185, 32]));
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.entityCollection.UpdateUniformValues(0, [normalMatrix, modelViewMatrix, projectionMatrix, new Float32Array([0.0, 0.0, 0.0]), GetSunDirection()]);

    modelTransform = m4.multiply(m4.scaling([50, 32, 1]), m4.multiply(m4.rotationX(DegreesToRadians(90)), m4.translation([-100, -341, 1])));
    modelViewMatrix = m4.multiply(modelTransform, cameraTransform)
    normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.entityCollection.UpdateUniformValues(1, [normalMatrix, modelViewMatrix, projectionMatrix, new Float32Array([0.0, 0.0, 0.0]), GetSunDirection()]);      

    this.entityCollection.Draw();
}

function CreateUndergroundBackgroundUniformTemplate() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "color", "light"];
    let uniformMatrixSpecifier = [true, true, true, false, false];
    let uniformCopyFunctions = [webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniform3fv"), webglApp.GetGLProperty("uniform3fv")];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreateUndergroundBackgroundAttributes(objectAttributes) {
    let attributeNames = ["position", "normal"];
    let attributeValues = [
        new Float32Array(objectAttributes.vertices), 
        new Float32Array(objectAttributes.vertexNormals),
    ];
    let attributeSizes = [3, 3];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}