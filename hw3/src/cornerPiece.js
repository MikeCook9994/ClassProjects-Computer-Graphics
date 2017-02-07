function CornerPiece(colors, threeDimContext) {
    this.context = threeDimContext;
    this.colors = colors;
}

CornerPiece.prototype.Draw = function(transformation) {
    this.context.setTransformation(transformation);
}