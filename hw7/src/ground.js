function Ground(entityCollection) {
    this.entityCollection = entityCollection;
    for(let i = 0; i < 60; i++) {
        this.entityCollection.CreateEntity();
    }
}

Ground.prototype.EnableProgram = function() {
    return;
}

Ground.prototype.Draw = function() {
    this.entityCollection.Draw();
}

let attributeData = [
    new Float32Array(this.modelAttributes.vertices), 
    new Float32Array(this.modelAttributes.vertexNormals), 
];