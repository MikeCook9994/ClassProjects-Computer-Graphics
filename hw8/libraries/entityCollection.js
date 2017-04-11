function EntityCollection(model, vertexShaderSource, fragmentShaderSource, attributes, uniformTemplate) {
    this.model = model;
    this.attributes = attributes;
    this.uniformTemplate = uniformTemplate;
    this.entities = {};

    this.shaderProgram = CreateShaderProgram(vertexShaderSource, fragmentShaderSource);

    glHost.GetUniformLocations(this.shaderProgram, uniformTemplate);

    glHost.GetAttributeLocations(this.shaderProgram, this.attributes);
    glHost.EnableAttributes(this.attributes); 

    glHost.SetShaderProgram(this.shaderProgram);
    glHost.BufferAttributeData(this.shaderProgram, this.attributes);
}

EntityCollection.prototype.CreateEntity = function(entityId) {
    let uniform = new Uniform(this.uniformTemplate.name, this.uniformTemplate.isMatrix, this.uniformTemplate.glCopyUniformFunction, this.uniformTemplate.location);
    this.entities[entityId] = new Entity(this.model, uniform, this.attributes, this.shaderProgram, false);
}

EntityCollection.prototype.UpdateUniformValues = function(entityId, uniformValues) {
    this.entities[entityId].UpdateUniformValues(uniformValues);
}

EntityCollection.prototype.Draw = function() {
    this.entities.forEach((entity, index) => {
        entity.CopyUniformValues(this.uniforms[index]);
        entity.Draw();
    });
}

function CreateShaderProgram(vertexShaderSource, fragmentShaderSource) {
    let vertexShader = glHost.CreateAndCompileShader(glHost.gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = glHost.CreateAndCompileShader(glHost.gl.FRAGMENT_SHADER, fragmentShaderSource);
    return glHost.CreateAndConfigureProgram(vertexShader, fragmentShader);
}