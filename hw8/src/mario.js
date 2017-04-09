function Mario(glHost, objectAttributes, vertexShaderSource, fragmentShaderSource) {
    this.objectAttributes = objectAttributes;
    this.vertexShader = vertexShaderSource;
    this.fragmentShader = fragmentShaderSource;

    let shaderProgram = CreateShaderProgram(glHost, vertexShaderSource, fragmentShaderSource);

    this.attributes = CreateMarioAttributes(objectAttributes);
    glHost.GetAttributeLocations(shaderProgram, this.attributes);
  
    this.uniforms = CreateMarioUniforms(glHost);
    glHost.GetUniformLocations(shaderProgram, this.uniforms);
    
    this.entity = new Entity(glHost, objectAttributes, this.uniforms, this.attributes, shaderProgram);
    this.entity.BufferAttributes();
}

Mario.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let modelTransform = m4.multiply(m4.rotationY(DegreesToRadians(270)), m4.multiply(m4.translation([0.0, 2.80, -10.9]), m4.scaling([8, 8, 8])));
    UpdateMarioUniformValues(this.uniforms, cameraMatrix, projectionMatrix, modelTransform);
    this.entity.CopyUniformValues(this.uniforms);
    this.entity.Draw();
}

function UpdateMarioUniformValues(uniformSet, cameraTransform, projectionMatrix, modelTransform) {
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    uniformSet["normalMatrix"].value = normalMatrix;
    uniformSet["modelViewMatrix"].value = modelViewMatrix;
    uniformSet["projectionMatrix"].value = projectionMatrix;
    uniformSet["color"].value = new Float32Array([1.0, 1.0, 0.0]);
}

function CreateMarioUniforms(glHost) {
    let groundUniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "color"];
    let groundUniformMatrixBooleans = [true, true, true, false];
    let groundUniformCopyFunctions = [glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniform3fv];
    return CreateUniforms(groundUniformNames, groundUniformMatrixBooleans, groundUniformCopyFunctions);
}

function CreateMarioAttributes(objectAttributes) {
    let attributeNames = ["position", "normal"];
    let attributeValues = [new Float32Array(objectAttributes.vertices), new Float32Array(objectAttributes.vertexNormals)];
    return CreateAttributes(attributeNames, attributeValues);
}

