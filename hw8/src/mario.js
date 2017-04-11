function Mario(objectAttributes, vertexShaderSource, fragmentShaderSource, textureImageSource) {
    this.objectAttributes = objectAttributes;
    this.vertexShader = vertexShaderSource;
    this.fragmentShader = fragmentShaderSource;

    this.attributes = CreateMarioAttributes(objectAttributes);
    this.uniforms = CreateMarioUniforms();

    this.entity = new Entity(objectAttributes, this.uniforms, this.attributes, null, vertexShaderSource, fragmentShaderSource, textureImageSource); 
}

Mario.prototype.Draw = function(cameraTransform, projectionMatrix) {
    let modelTransform = m4.multiply(m4.rotationY(DegreesToRadians(270)), m4.multiply(m4.scaling([2, 2, 2]), m4.translation([0.0, 19, -87.5])));
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.entity.UpdateUniformValues([normalMatrix, modelViewMatrix, projectionMatrix, 0]);
    this.entity.Draw();
}

function UpdateMarioUniformValues(entity, uniformSet, cameraTransform, projectionMatrix, modelTransform) {


    uniformSet["normalMatrix"].value = normalMatrix;
    uniformSet["modelViewMatrix"].value = modelViewMatrix;
    uniformSet["projectionMatrix"].value = projectionMatrix;
    uniformSet["textureSampler"].value = 0;
    entity.UpdateUniformValues(uniformSet);
}

function CreateMarioUniforms(shaderProgram) {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "textureSampler"];
    let uniformMatrixSpecifier = [true, true, true, false]; 
    let uniformCopyFunctions = [glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniform1i];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions, shaderProgram);
}

function CreateMarioAttributes(objectAttributes, shaderProgram) {
    let attributeNames = ["position", "normal", "textureCoordinates"];
    let attributeValues = [
        new Float32Array(objectAttributes.vertices), 
        new Float32Array(objectAttributes.vertexNormals), 
        new Float32Array(objectAttributes.vertexTextureCoordinates)
    ];
    let attributeSizes = [3, 3, 2];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}