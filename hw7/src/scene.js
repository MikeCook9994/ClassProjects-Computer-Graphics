function Scene() {
    this.entities = [];
}

Scene.prototype.AddEntity = function(entity) {
    this.entities.push(entity);
}

Scene.prototype.Draw = function() {
    this.entities.forEach((entity) => {
        entity.Draw();
    });
}