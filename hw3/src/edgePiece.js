function EdgePiece(colors, threeDimContext) {
    this.context = threeDimContext;
    this.color = colors;
}

EdgePiece.prototype.Draw = function(transformation) {
    this.context.setTransformation(transformation);
}