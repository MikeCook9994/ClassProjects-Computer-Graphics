function Entity(model, uniforms, attributes, shaderProgram, vertexShaderSource, fragmentShaderSource, textureImageSource) {
    this.modelAttributes = model;    
    this.uniforms = uniforms;
    this.attributes = attributes;
    this.shaderProgram = shaderProgram;

    if(shaderProgram === null) {
        this.shaderProgram = CreateShaderProgram(vertexShaderSource, fragmentShaderSource);

        glHost.GetAttributeLocations(this.shaderProgram, this.attributes);
        glHost.GetUniformLocations(this.shaderProgram, this.uniforms);
    }
    
    glHost.EnableAttributes(this.shaderProgram, this.attributes); 
    glHost.BufferAttributeData(this.shaderProgram, this.attributes);

    if(textureImageSource !== null) {
        this.texture = glHost.SetupTexture(this.shaderProgram, textureImageSource);
    }
}

Entity.prototype.UpdateUniformValues = function(uniformValueSet) {
    Object.keys(this.uniforms).forEach((uniformName, uniformIndex) => {
        this.uniforms[uniformName].value = uniformValueSet[uniformIndex];
    });
}

Entity.prototype.Draw = function() {
    glHost.SetShaderProgram(this.shaderProgram);
    glHost.SpecifyAttributes(this.attributes);
    Object.keys(this.uniforms).forEach((uniformName) => {
        let uniform = this.uniforms[uniformName];
        if(uniform.isMatrix) {
            uniform.glCopyUniformFunction.call(glHost.gl, uniform.location, false, uniform.value);
        }
        else {
            uniform.glCopyUniformFunction.call(glHost.gl, uniform.location, uniform.value);
        }
    });
    glHost.gl.drawArrays(glHost.gl.TRIANGLES, 0, this.modelAttributes.vertices.length / 3);
}