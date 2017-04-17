function Entity(model, uniforms, attributes, shaderProgram, vertexShaderSource, fragmentShaderSource) {
    this.model = model;    
    this.uniforms = uniforms;
    this.attributes = attributes;
    this.shaderProgram = shaderProgram;

    if(shaderProgram === null) {
        this.shaderProgram = CreateShaderProgram(vertexShaderSource, fragmentShaderSource);
        webglApp.GetAttributeLocations(this.shaderProgram, this.attributes);
        webglApp.GetUniformLocations(this.shaderProgram, this.uniforms);
        this.textures = [];
    }
    webglApp.BufferAttributeData(this.shaderProgram, this.attributes);
}

Entity.prototype.SetupTextures = function(textureImageSources) {
    textureImageSources.forEach((textureImageSource) => {
        this.textures.push(webglApp.SetupTexture(textureImageSource));
    });
}

Entity.prototype.UpdateUniformValues = function(uniformValueSet) {
    Object.keys(this.uniforms).forEach((uniformName, uniformIndex) => {
        this.uniforms[uniformName].value = uniformValueSet[uniformIndex];
    });
}

Entity.prototype.Draw = function() {
    webglApp.SetShaderProgram(this.shaderProgram);
    webglApp.SpecifyAttributes(this.attributes);
    Object.keys(this.uniforms).forEach((uniformName) => {
        let uniform = this.uniforms[uniformName];
        if(uniform.isMatrix) {
            uniform.glCopyUniformFunction.call(webglApp.gl, uniform.location, false, uniform.value);
        }
        else {
            uniform.glCopyUniformFunction.call(webglApp.gl, uniform.location, uniform.value);
        }
    });

    if(this.hasOwnProperty("textures")) {
        webglApp.EnableTextures(this.textures);
    }

    webglApp.Draw(this.model.vertices.length / 3);
}