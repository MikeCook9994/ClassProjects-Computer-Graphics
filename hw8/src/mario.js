function Mario(objectAttributes, vertexShaderSource, fragmentShaderSource) {
    this.objectAttributes = objectAttributes;
    this.vertexShader = vertexShaderSource;
    this.fragmentShader = fragmentShaderSource;

    let shaderProgram = CreateShaderProgram(vertexShaderSource, fragmentShaderSource);
    this.attributes = CreateMarioAttributes(objectAttributes);
    this.uniforms = CreateMarioUniforms();

    let textureImageSource = "http://i.imgur.com/lvaEw2u.png";
    this.texture = glHost.SetupTexture(textureImageSource);
    
    this.entity = new Entity(objectAttributes, this.uniforms, this.attributes, shaderProgram, true); 
}

Mario.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let modelTransform = m4.multiply(m4.rotationY(DegreesToRadians(270)), m4.multiply(m4.scaling([2, 2, 2]), m4.translation([0.0, 19, -87.5])));
    UpdateMarioUniformValues(this.entity, this.uniforms, cameraMatrix, projectionMatrix, modelTransform);

    this.entity.Draw();
}

function UpdateMarioUniformValues(entity, uniformSet, cameraTransform, projectionMatrix, modelTransform) {
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

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