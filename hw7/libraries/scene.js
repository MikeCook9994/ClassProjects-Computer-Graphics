function Scene() {
    this.entities = [];
}

Scene.prototype.AddEntity = function(entity) {
    this.entities.push(entity);
}

Scene.prototype.AddEntityCollection = function(entity) {
    this.entities.push(entity);
}

Scene.prototype.CopyShaderValues = function(cameraTransform, projectionTransform) {
    this.entities.forEach((entity) => {
        entity.CopyShaderValues(cameraTransform, projectionTransform);
    });
}

Scene.prototype.Draw = function() {
    this.entities.forEach((entity) => {
        entity.Draw();
    });
}