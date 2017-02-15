function Geometry(threeDimContext, vertices, color, depth) {
    this.context = threeDimContext;
    this.vertices = vertices;
    this.depth = depth;
    this.color = color;
}

Geometry.prototype.Draw = function(transformation) {
    this.context.fillStyle = this.color;
    this.context.beginPath();
    this.context.moveTo(vertices[0], transformation);
    this.vertices.foreach((vertex) => {
        this.context.lineTo(vertex[0], vertex[1], vertex[2], transformation);        
    });
    this.context.closePath();
    this.context.fill();
}