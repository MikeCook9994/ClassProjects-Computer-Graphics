function Geometry(threeDimContext, vertices, color) {
    this.context = threeDimContext;
    this.vertices = vertices;
    this.depth = CalculateDepth(this.vertices);
    this.color = color;
}

Geometry.prototype.Draw = function(transformation) {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.moveTo(this.vertices[0][0], this.vertices[0][1], this.vertices[0][2], transformation);
    this.vertices.forEach((vertex) => {
        this.context.lineTo(vertex[0], vertex[1], vertex[2], transformation);        
    });
    this.context.closePath();
    this.context.fill();
}

function CalculateDepth(vertices) {
    depthSum = 0;
    vertices.forEach((vertex) => {
        depthSum += vertex[2];
    });
    return (depthSum / vertices.length);
}