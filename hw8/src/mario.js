function Mario(objectAttributes, vertexShaderSource, fragmentShaderSource, textureImageSources) {
    let attributes = CreateMarioAttributes(objectAttributes);
    let uniforms = CreateMarioUniforms();

    this.entity = new Entity(objectAttributes, uniforms, attributes, null, vertexShaderSource, fragmentShaderSource);
    this.entity.SetupTextures(textureImageSources);
}

Mario.prototype.Draw = function(cameraTransform, projectionMatrix) {
    let modelTransform = m4.multiply(m4.rotationY(DegreesToRadians(180)), m4.multiply(m4.scaling([2.5, 2.5, 2.5]), m4.translation([89.0, 23.25, 11.0])));
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.entity.UpdateUniformValues([normalMatrix, modelViewMatrix, projectionMatrix, 0, GetSunDirection()]);
    this.entity.Draw();
}

function CreateMarioUniforms(shaderProgram) {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "textureSampler", "light"];
    let uniformMatrixSpecifier = [true, true, true, false, false]; 
    let uniformCopyFunctions = [glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniform1i, glHost.gl.uniform3fv];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreateMarioAttributes(objectAttributes) {
    let attributeNames = ["position", "normal", "textureCoordinates"];
    let attributeValues = [
        new Float32Array(objectAttributes.vertices), 
        new Float32Array(objectAttributes.vertexNormals), 
        new Float32Array(objectAttributes.vertexTextureCoordinates)
    ];
    let attributeSizes = [3, 3, 2];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}