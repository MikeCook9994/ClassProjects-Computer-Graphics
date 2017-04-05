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
    this.glHost.BufferAttributeData(this.attributes, this.shaderProgram);
    this.glHost.SpecifyAttributes(this.attributes);
}

Entity.prototype.UpdateUniforms = function(uniformSet) {
    this.uniforms = uniformSet;
}

Entity.prototype.EnableProgram = function() {
    this.glHost.SetShaderProgram(this.shaderProgram);
}

Entity.prototype.CopyUniformValues = function() {
    Object.keys(this.uniforms).forEach((uniformName) => {
        let uniform = this.uniforms[uniformName];
        if(uniform.isMatrix) {
            uniform.glCopyUniformFunction.call(this.glHost.gl, uniform.location, false, uniform.value);
        }
        else {
            uniform.glCopyUniformFunction.call(this.glHost.gl, uniform.location, uniform.value);
        }
    });
}

Entity.prototype.Draw = function() {
    this.glHost.gl.drawArrays(this.glHost.gl.TRIANGLES, 0, this.modelAttributes.vertices.length / 3);
}