function Geometry(threeDimContext, vertices, color) {
    this.context = threeDimContext;
    this.vertices = vertices;
    this.depth = CalculateDepth(this.vertices);
    this.color = color;
}

Geometry.prototype.Draw = function(transformation) {
    this.context.fillStyle = this.color;
    this.context.strokeStyle = this.color;
    this.context.beginPath();
    
    this.context.moveTo(this.vertices[0], transformation); 
    this.vertices.forEach((vertex, index) => {
        if(index != 0) {
            this.context.lineTo(vertex, transformation); 
        }       
    });

    this.context.closePath();
    this.context.fill();
    this.context.stroke();
}

function CalculateDepth(vertices) {
    depthSum = 0;
    vertices.forEach((vertex) => {
        depthSum += vertex[2];
    });
    return (depthSum / vertices.length);
}