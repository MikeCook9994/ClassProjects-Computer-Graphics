function Pipe(objectAttributes, vertexShaderSource, fragmentShaderSource) {
    this.objectAttributes = objectAttributes;
    this.vertexShader = vertexShaderSource;
    this.fragmentShader = fragmentShaderSource;

    let shaderProgram = CreateShaderProgram(vertexShaderSource, fragmentShaderSource);

    this.attributes = CreatePipeAttributes(objectAttributes);
    this.uniforms = CreatePipeUniforms();
    
    this.entity = new Entity(objectAttributes, this.uniforms, this.attributes, shaderProgram, true);
}

Pipe.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let modelTransform = m4.multiply(m4.translation([0.05, 0.5, 2.9]), m4.scaling([15, 15, 15]));
    UpdatePipeUniformValues(this.entity, this.uniforms, cameraMatrix, projectionMatrix, modelTransform);

    this.entity.Draw();
}

function UpdatePipeUniformValues(entity, uniformSet, cameraTransform, projectionMatrix, modelTransform) {
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    uniformSet["normalMatrix"].value = normalMatrix;
    uniformSet["modelViewMatrix"].value = modelViewMatrix;
    uniformSet["projectionMatrix"].value = projectionMatrix;
    uniformSet["color"].value = new Float32Array([0.0, 1.0, 0.0]);
    entity.UpdateUniformValues(uniformSet);
}

function CreatePipeUniforms() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "color"];
    let uniformMatrixSpecifier = [true, true, true, false];
    let uniformCopyFunctions = [glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniform3fv];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreatePipeAttributes(objectAttributes) {
    let attributeNames = ["position", "normal"];
    let attributeValues = [new Float32Array(objectAttributes.vertices), new Float32Array(objectAttributes.vertexNormals)];
    let attributeSizes = [3, 3];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}

