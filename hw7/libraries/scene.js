function Scene() {
    this.entities = [];
}

Scene.prototype.AddEntity = function(entity) {
    this.entities.push(entity);
}

Scene.prototype.AddEntityCollection = function(entity) {
    this.entities.push(entity);
}

Scene.prototype.CopyUniformValues = function(cameraTransform, projectionTransform) {
    this.entities.forEach((entity) => {
        entity.SetUniformValues(cameraTransform, projectionTransform);
    });
}

Scene.prototype.Draw = function() {
    this.entities.forEach((entity) => {
        entity.EnableProgram();
        entity.Draw();
    });
}