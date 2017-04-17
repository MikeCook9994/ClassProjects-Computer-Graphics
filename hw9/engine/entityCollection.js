function EntityCollection(model, vertexShaderSource, fragmentShaderSource, attributes, uniformTemplate) {
    this.model = model;
    this.attributes = attributes;
    this.uniformTemplate = uniformTemplate;
    this.entities = {};
    this.textures = [];

    this.shaderProgram = CreateShaderProgram(vertexShaderSource, fragmentShaderSource);

    glHost.GetUniformLocations(this.shaderProgram, uniformTemplate);
    
    glHost.GetAttributeLocations(this.shaderProgram, this.attributes);
    glHost.BufferAttributeData(this.shaderProgram, this.attributes);
}

EntityCollection.prototype.CreateEntity = function(entityId) {
    let uniforms = {};
    Object.keys(this.uniformTemplate).forEach((uniformName) => {
        uniforms[uniformName] = new Uniform(
            this.uniformTemplate[uniformName].name, 
            this.uniformTemplate[uniformName].isMatrix, 
            this.uniformTemplate[uniformName].glCopyUniformFunction, 
            this.uniformTemplate[uniformName].location
        );
    });
    this.entities[entityId] = new Entity(this.model, uniforms, this.attributes, this.shaderProgram, null, null);
}

EntityCollection.prototype.SetupTextures = function(textureImageSources) {
    textureImageSources.forEach((textureImageSource) => {
        this.textures.push(glHost.SetupTexture(textureImageSource));
    });
}

EntityCollection.prototype.UpdateUniformValues = function(entityId, uniformValueSet) {
    this.entities[entityId].UpdateUniformValues(uniformValueSet);
}
 
EntityCollection.prototype.Draw = function() {
    glHost.EnableTextures(this.textures);
    Object.keys(this.entities).forEach((entityId, index) => {
        this.entities[entityId].Draw();
    });
}