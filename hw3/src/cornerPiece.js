function CornerPiece(colors, threeDimContext) {
    this.context = threeDimContext;
    this.colors = colors;
}

CornerPiece.prototype.Draw = function() {
    this.context.lineWidth = 1;

    this.context.strokeStyle = "black";
    this.context.beginPath();
    this.context.Rect(0, 0, 0, 10, 10);
    this.context.closePath();
    this.context.stroke();

    this.context.strokeStyle = this.colors[0];
    this.context.beginPath();
    this.context.Rect(0, 0, 10, 10, 10);
    this.context.closePath();
    this.context.stroke();

    this.context.strokeStyle = "black";
    this.context.beginPath();
    this.context.goToOrigin();
    this.context.lineTo(0, 0, 10);

    this.context.moveTo(0, 10, 0);
    this.context.lineTo(0, 10, 10);

    this.context.moveTo(10, 10, 0);
    this.context.lineTo(10, 10, 10);

    this.context.moveTo(10, 0, 0);
    this.context.lineTo(10, 0, 10);
    this.context.closePath();
    this.context.stroke();
}