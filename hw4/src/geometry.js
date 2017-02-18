function Geometry(threeDimContext, vertices, color, transformation) {
    this.context = threeDimContext;
    this.vertices = vertices
    this.depth = CalculateDepth(this.vertices, transformation);
    this.color = color;
    this.transformation = transformation;
}

Geometry.prototype.Draw = function() {
    this.context.fillStyle = this.color;
    this.context.strokeStyle = this.color;
    this.context.beginPath();
    
    this.context.moveTo(this.vertices[0][0], this.vertices[0][1], this.vertices[0][2], this.transformation); 
    this.vertices.forEach((vertex, index) => {
        if(index != 0) {
            this.context.lineTo(vertex[0], vertex[1], vertex[2], this.transformation); 
        }       
    });

    this.context.closePath();
    this.context.fill();
    this.context.stroke();
}

function transformVertices(vertices, transformation) {
    let transformedVertices = [];
    vertices.forEach((vertex, index) => {
        transformedVertices[index] = m4.transformPoint(transformation, vertex);
    });

    return transformedVertices;
}

function CalculateDepth(vertices, transformation) {
    transformedVertices = transformVertices(vertices, transformation);

    depthSum = 0;
    transformedVertices.forEach((vertex) => {
        depthSum += vertex[2];
    });
    return (depthSum / transformedVertices.length);
}