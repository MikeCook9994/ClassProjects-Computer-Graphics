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
    this.glHost.BufferAttributeData(this.attributes, this.shaderProgram);

    let modelViewMatrix = m4.multiply(modelMatrix, cameraMatrix);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.uniforms.forEach((uniform) => {
        if(uniform.isMatrix) {
            uniform.glCopyUniformFunction(uniform.location, false, uniform.value);
        }
        else {
            uniform.glCopyUniformFunction(uniform.location, uniform.value);
        }
    });
}

Entity.prototype.Draw = function() {
    this.glHost.SpecifyAttributes(this.attributes);
    this.glHost.gl.drawArrays(this.glHost.gl.TRIANGLES, 0, this.modelAttributes.vertices.length / 3);
}