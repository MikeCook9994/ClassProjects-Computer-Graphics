function EntityCollection(glHost, model, vertexShader, fragmentShader) {
    this.glHost = glHost;
    this.model = model;
    this.vertexShader = vertexShader;
    this.fragmentShader = fragmentShader;
    this.entities = [];
}

EntityCollection.prototype.CreateEntity = function(uniforms, attributes) {
    let entity = new Entity(this.glHost, this.model, uniforms, attributes);
    entity.SetupProgram(this.vertexShader, this.fragmentShader);
    this.entities.push(entity);
}

EntityCollection.prototype.CopyUniformValues = function(entityIndex, uniformSet) {
    this.entities[entityIndex].UpdateUniforms(uniformSet)
    this.entities[entityIndex].EnableProgram();
    this.entities[entityIndex].CopyUniformValues();
}

EntityCollection.prototype.Draw = function() {
    this.entities.forEach((entity) => {
        entity.EnableProgram();
        entity.Draw();
    });
}