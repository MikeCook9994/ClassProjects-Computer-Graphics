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
    let uniforms = {};
    Object.keys(this.uniformTemplate).forEach((uniformName) => {
        uniforms[uniformName] = new Uniform(this.uniformTemplate[uniformName].name, this.uniformTemplate[uniformName].isMatrix, this.uniformTemplate[uniformName].glCopyUniformFunction, this.uniformTemplate[uniformName].location);
    });
    this.entities[entityId] = new Entity(this.model, uniforms, this.attributes, this.shaderProgram, null, null, null);
}

EntityCollection.prototype.UpdateUniformValues = function(entityId, uniformValueSet) {
    this.entities[entityId].UpdateUniformValues(uniformValueSet);
}

EntityCollection.prototype.Draw = function() {
    Object.keys(this.entities).forEach((entityId, index) => {
        this.entities[entityId].Draw();
    });
}

function CreateShaderProgram(vertexShaderSource, fragmentShaderSource) {
    let vertexShader = glHost.CreateAndCompileShader(glHost.gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = glHost.CreateAndCompileShader(glHost.gl.FRAGMENT_SHADER, fragmentShaderSource);
    return glHost.CreateAndConfigureProgram(vertexShader, fragmentShader);
}