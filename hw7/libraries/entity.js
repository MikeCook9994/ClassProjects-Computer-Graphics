function Entity(glHost, model, uniforms, attributes) {
    this.glHost = glHost;
    this.modelAttributes = model;
    this.uniforms = uniforms;
    this.attributes = attributes;
}

Entity.prototype.SetupProgram = function(vertexShaderSource, fragmentShaderSource) {
    let vertexShader = this.glHost.CreateAndCompileShader(this.glHost.gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = this.glHost.CreateAndCompileShader(this.glHost.gl.FRAGMENT_SHADER, fragmentShaderSource);
    this.shaderProgram = this.glHost.CreateAndConfigureProgram(vertexShader, fragmentShader);

    this.glHost.GetUniformLocations(this.shaderProgram, this.uniforms);
    this.glHost.GetAttributeLocations(this.shaderProgram, this.attributes);
}

Entity.prototype.EnableProgram = function() {
    this.glHost.SetShaderProgram(this.shaderProgram);
}

Entity.prototype.BufferData = function(cameraMatrix, projectionMatrix, modelMatrix) {
    let modelViewMatrix = m4.multiply(modelMatrix, cameraMatrix);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.glHost.BufferAttributeData(this.attributes, this.shaderProgram);
    this.glHost.SpecifyAttributes(this.attributes);
}

Entity.prototype.Draw = function() {
    this.glHost.gl.drawArrays(this.glHost.gl.TRIANGLES, 0, this.modelAttributes.vertices.length / 3);
}

function DegreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}