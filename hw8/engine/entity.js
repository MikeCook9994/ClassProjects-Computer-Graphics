function Entity(model, uniforms, attributes, shaderProgram, vertexShaderSource, fragmentShaderSource) {
    this.modelAttributes = model;    
    this.uniforms = uniforms;
    this.attributes = attributes;
    this.shaderProgram = shaderProgram;

    if(shaderProgram === null) {
        this.shaderProgram = CreateShaderProgram(vertexShaderSource, fragmentShaderSource);
        glHost.GetAttributeLocations(this.shaderProgram, this.attributes);
        glHost.GetUniformLocations(this.shaderProgram, this.uniforms);
        this.textures = [];
    }
    glHost.BufferAttributeData(this.shaderProgram, this.attributes);
}

Entity.prototype.SetupTextures = function(textureImageSources) {
    textureImageSources.forEach((textureImageSource) => {
        this.textures.push(glHost.SetupTexture(textureImageSource));
    });
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

    if(this.hasOwnProperty("textures")) {
        glHost.EnableTextures(this.textures);
    }

    glHost.gl.drawArrays(glHost.gl.TRIANGLES, 0, this.modelAttributes.vertices.length / 3);
}