function EntityCollection(glHost, model, vertexShaderSource, fragmentShaderSource, attributes) {
    this.glHost = glHost;
    this.model = model;
    this.attributes = attributes;
    this.uniforms = [];
    this.entities = [];
    this.shaderProgram = CreateShaderProgram(glHost, vertexShaderSource, fragmentShaderSource);
}

EntityCollection.prototype.CreateEntity = function(uniform) {
    this.glHost.GetUniformLocations(this.shaderProgram, uniform);
    this.uniforms.push(uniform);

    this.glHost.GetAttributeLocations(this.shaderProgram, this.attributes);

    let entity = new Entity(this.glHost, this.model, uniform, this.attributes, this.shaderProgram);
    this.entities.push(entity);
}

EntityCollection.prototype.CopyUniformValues = function(entityIndex, uniformValues) {
    Object.keys(this.uniforms[entityIndex]).forEach((uniformName, index) => {
        this.uniforms[entityIndex][uniformName].value = uniformValues[index];
    });
}

EntityCollection.prototype.Draw = function() {
    this.glHost.SetShaderProgram(this.shaderProgram);
    this.glHost.BufferAttributeData(this.shaderProgram, this.attributes);
    this.glHost.SpecifyAttributes(this.attributes);
    this.entities.forEach((entity, index) => {
        entity.CopyUniformValues(this.uniforms[index]);
        entity.BufferAttributes();
        entity.Draw();
    });
}

function CreateShaderProgram(glHost, vertexShaderSource, fragmentShaderSource) {
    let vertexShader = glHost.CreateAndCompileShader(glHost.gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = glHost.CreateAndCompileShader(glHost.gl.FRAGMENT_SHADER, fragmentShaderSource);
    return glHost.CreateAndConfigureProgram(vertexShader, fragmentShader);
}