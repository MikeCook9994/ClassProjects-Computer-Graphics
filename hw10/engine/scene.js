function Scene() {
    this.objects = [];
    this.frameCount = 0;
}

Scene.prototype.AddEntity = function(entity) {
    this.objects.push(entity);
}

Scene.prototype.AddEntityCollection = function(entity) {
    this.objects.push(entity);
}

Scene.prototype.Draw = function(cameraTransform, projectionTransform) {
    this.objects.forEach((object) => {
        object.Draw(cameraTransform, projectionTransform, this.frameCount);
    });
    this.frameCount++;
}