function Pipe(glHost, objectAttributes, vertexShaderSource, fragmentShaderSource) {
    this.objectAttributes = objectAttributes;
    this.vertexShader = vertexShaderSource;
    this.fragmentShader = fragmentShaderSource;

    let shaderProgram = CreateShaderProgram(glHost, vertexShaderSource, fragmentShaderSource);

    this.attributes = CreatePipeAttributes(objectAttributes);
    glHost.GetAttributeLocations(shaderProgram, this.attributes);
  
    this.uniforms = CreatePipeUniforms(glHost);
    glHost.GetUniformLocations(shaderProgram, this.uniforms);
    
    this.entity = new Entity(glHost, objectAttributes, this.uniforms, this.attributes, shaderProgram);
    this.entity.BufferAttributes();
}

Pipe.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let modelTransform = m4.multiply(m4.translation([0.05, 0.5, 2.9]), m4.scaling([15, 15, 15]));
    UpdatePipeUniformValues(this.uniforms, cameraMatrix, projectionMatrix, modelTransform);
    this.entity.CopyUniformValues(this.uniforms);
    this.entity.Draw();
}

function UpdatePipeUniformValues(uniformSet, cameraTransform, projectionMatrix, modelTransform) {
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    uniformSet["normalMatrix"].value = normalMatrix;
    uniformSet["modelViewMatrix"].value = modelViewMatrix;
    uniformSet["projectionMatrix"].value = projectionMatrix;
    uniformSet["color"].value = new Float32Array([0.0, 1.0, 0.0]);
}

function CreatePipeUniforms(glHost) {
    let groundUniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "color"];
    let groundUniformMatrixBooleans = [true, true, true, false];
    let groundUniformCopyFunctions = [glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniform3fv];
    return CreateUniforms(groundUniformNames, groundUniformMatrixBooleans, groundUniformCopyFunctions);
}

function CreatePipeAttributes(objectAttributes) {
    let attributeNames = ["position", "normal"];
    let attributeValues = [new Float32Array(objectAttributes.vertices), new Float32Array(objectAttributes.vertexNormals)];
    return CreateAttributes(attributeNames, attributeValues);
}

