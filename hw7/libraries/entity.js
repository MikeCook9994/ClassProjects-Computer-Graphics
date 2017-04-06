function Entity(glHost, model, uniforms, attributes, shaderProgram) {
    this.glHost = glHost;
    this.modelAttributes = model;    
    this.uniforms = uniforms;
    this.attributes = attributes;
    this.shaderProgram = shaderProgram;
}

Entity.prototype.CopyUniformValues = function(uniformSet) {
    this.glHost.SetShaderProgram(this.shaderProgram);
    this.uniforms = uniformSet
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
    this.glHost.SetShaderProgram(this.shaderProgram);
    this.glHost.BufferAttributeData(this.shaderProgram, this.attributes);
    this.glHost.SpecifyAttributes(this.attributes);
    this.glHost.gl.drawArrays(this.glHost.gl.TRIANGLES, 0, this.modelAttributes.vertices.length / 3);
}