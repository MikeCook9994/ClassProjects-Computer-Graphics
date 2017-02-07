function CenterPiece(color, threeDimContext, children) {
    this.context = threeDimContext;
    this.color = color;
    this.children = children;
}

CenterPiece.prototype.Draw = function(transformation) {
    this.context.strokeStyle = this.color;
    this.context.setTransformation(transformation);
    drawSingleCube(this.context);
}