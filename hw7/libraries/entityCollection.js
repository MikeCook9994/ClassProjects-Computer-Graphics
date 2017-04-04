function EntityCollection(glHost, model, vertexShader, fragmentShader, attributes, uniforms) {
    this.glHost = glHost;
    this.model = model;
    this.attributes = attributes;
    this.uniforms = uniforms;
    this.entities = [];
}

EntityCollection.prototype.CreateEntity = function() {
    let entity = new Entity(this.glHost, this.model, this.attributes, this.uniforms);
    entity.SetupProgram(vertexShader, fragmentShader);
    this.entities.push(entity);
}

EntityCollection.prototype.SetUniformValues = function(cameraTransform, projectionTransform, modelTransform) {
    this.entities.forEach((entity) => {
        entity.SetUniformValues(cameraTransform, projectionTransform, modelTransform);
    });
}

EntityCollection.prototype.EnableProgram = function() {
    return;
}

EntityCollection.prototype.Draw = function() {
    this.entities.forEach((entity) => {
        entity.EnableProgram();
        entity.Draw();
    });
}

let attributeData = [
    new Float32Array(this.modelAttributes.vertices), 
    new Float32Array(this.modelAttributes.vertexNormals), 
];