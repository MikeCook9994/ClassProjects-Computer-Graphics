function Scene() {
    this.entities = [];
}

Scene.prototype.AddEntity = function(entity) {
    this.entities.push(entity);
}

Scene.prototype.AddEntityCollection = function(entity) {
    this.entities.push(entity);
}

Scene.prototype.Draw = function(cameraTransform, projectionTransform) {
    this.entities.forEach((entity) => {
        entity.Draw(cameraTransform, projectionTransform);
    });
}