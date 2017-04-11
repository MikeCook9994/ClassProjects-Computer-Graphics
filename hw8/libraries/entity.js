function Entity(model, uniforms, attributes, shaderProgram, getLocations) {
    this.modelAttributes = model;    
    this.uniforms = uniforms;
    this.attributes = attributes;
    this.shaderProgram = shaderProgram;

    glHost.SetShaderProgram(this.shaderProgram);

    if(getLocations === true) {
        glHost.GetAttributeLocations(shaderProgram, this.attributes);
        glHost.GetUniformLocations(shaderProgram, this.uniforms);
    }
    glHost.EnableAttributes(attributes); 

    glHost.BufferAttributeData(this.shaderProgram, this.attributes);
}

Entity.prototype.UpdateUniformValues = function(uniformSet) {
    this.uniforms = uniformSet;
}

Entity.prototype.Draw = function() {
    glHost.SetShaderProgram(this.shaderProgram);
    Object.keys(this.uniforms).forEach((uniformName) => {
        let uniform = this.uniforms[uniformName];
        if(uniform.isMatrix) {
            uniform.glCopyUniformFunction.call(glHost.gl, uniform.location, false, uniform.value);
        }
        else {
                uniform.glCopyUniformFunction.call(glHost.gl, uniform.location, uniform.value);
        }
    });

    glHost.SpecifyAttributes(this.attributes);
    glHost.gl.drawArrays(glHost.gl.TRIANGLES, 0, this.modelAttributes.vertices.length / 3);
}