function UndergroundPipe(objectAttributes, vertexShaderSource, fragmentShaderSource) {
    let attributes = CreatePipeAttributes(objectAttributes);
    let uniforms = CreatePipeUniforms();
    
    this.entity = new Entity(objectAttributes, uniforms, attributes, null, vertexShaderSource, fragmentShaderSource);
}

UndergroundPipe.prototype.Draw = function(cameraTransform, projectionMatrix) {
    let modelTransform = m4.multiply(m4.rotationZ(DegreesToRadians(270)), m4.multiply(m4.scaling([15, 15, 15]), m4.translation([-125, -272, 9.5])));
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.entity.UpdateUniformValues([normalMatrix, modelViewMatrix, projectionMatrix, new Float32Array([0.282, 0.69, 0.0])]);   
    this.entity.Draw();
}