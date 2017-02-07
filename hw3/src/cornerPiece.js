function CornerPiece(colors, threeDimContext) {
    this.context = threeDimContext;
    this.colors = colors;
}

CornerPiece.prototype.Draw = function() {
    this.context.setTransformation(transformation);
    drawSingleCube(this.context);
}