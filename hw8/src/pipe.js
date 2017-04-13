function Pipe(objectAttributes, vertexShaderSource, fragmentShaderSource) {
    let attributes = CreatePipeAttributes(objectAttributes);
    let uniforms = CreatePipeUniforms();
    
    this.entity = new Entity(objectAttributes, uniforms, attributes, null, vertexShaderSource, fragmentShaderSource);
}

Pipe.prototype.Draw = function(cameraTransform, projectionMatrix) {
    let modelTransform = m4.multiply(m4.translation([-2.9, 0.5, 0.58]), m4.scaling([15, 15, 15]));
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.entity.UpdateUniformValues([normalMatrix, modelViewMatrix, projectionMatrix, new Float32Array([0.0, 1.0, 0.0])]);   
    this.entity.Draw();
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