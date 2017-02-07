function EdgePiece(colors, threeDimContext) {
    this.context = threeDimContext;
    this.color = colors;
}

EdgePiece.prototype.Draw = function() {
    this.context.setTransformation(transformation);
    drawSingleCube(this.context);
}