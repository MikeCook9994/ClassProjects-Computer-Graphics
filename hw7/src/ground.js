function Ground(glHost, objectAttributes, vertexShader, fragmentShader) {
    this.objectAttributes = objectAttributes;
    this.entityCollection = new EntityCollection(glHost, objectAttributes, vertexShader, fragmentShader);
    this.entityCount = 60;
    this.uniforms = [];

    for(let i = 0; i < this.entityCount; i++) {
        let uniformsAndAttributes = SetupGroundAttributesAndUniforms(glHost);

        this.uniforms.push(uniformsAndAttributes.uniforms);

        uniformsAndAttributes.attributes["position"].value = new Float32Array(objectAttributes.vertices);
        uniformsAndAttributes.attributes["normal"].value = new Float32Array(objectAttributes.vertexNormals);
        
        this.entityCollection.CreateEntity(uniformsAndAttributes.uniforms, uniformsAndAttributes.attributes);
    }
}

Ground.prototype.CopyShaderValues = function(cameraTransform, projectionTransform) {
    for(let i = 0; i < this.entityCount; i++) {
        let modelTransform = m4.multiply(m4.translation([2.2 * (i), 0.0, 0.0]), m4.scaling([10, 10, 10]));
        UpdateUniformValues(this.uniforms[i], cameraTransform, projectionTransform, modelTransform, this.objectAttributes);
        this.entityCollection.CopyUniformValues(i, this.uniforms[i]);
    }
}

Ground.prototype.Draw = function() {
    this.entityCollection.Draw();
}

function SetupGroundAttributesAndUniforms(glHost) {
    let groundUniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "color"];
    let groundUniformMatrixBooleans = [true, true, true, false];
    let groundUniformCopyFunctions = [glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniform3fv];

    let groundAttributeNames = ["position", "normal"];

    return SetupAttributesAndUniforms(groundUniformNames, groundUniformMatrixBooleans, groundUniformCopyFunctions, groundAttributeNames);
}

function UpdateUniformValues(uniformSet, cameraTransform, projectionMatrix, modelTransform, objectAttributes) {
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    uniformSet["normalMatrix"].value = normalMatrix;
    uniformSet["modelViewMatrix"].value = modelViewMatrix;
    uniformSet["projectionMatrix"].value = projectionMatrix;
    uniformSet["color"].value = new Float32Array([0.54, 0.27, 0.07]);
}