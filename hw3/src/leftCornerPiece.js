function LeftCornerPiece(colors, threeDimContext) {
    this.context = threeDimContext;
    this.colors = colors;
}

LeftCornerPiece.prototype.Draw = function() {
    this.context.lineWidth = 1;

    this.context.strokeStyle = this.colors[0];
    this.context.beginPath();
    this.context.moveTo(10, 10, 0);
    this.context.lineTo(10, 10, 10);
    this.context.lineTo(0, 10, 10);
    this.context.lineTo(0, 10, 0);
    this.context.closePath();
    this.context.stroke();

    this.context.strokeStyle = this.colors[1];
    this.context.beginPath();
    this.context.goToOrigin();
    this.context.lineTo(0, 10, 0);
    this.context.lineTo(0, 10, 10);
    this.context.lineTo(0, 0, 10);
    this.context.closePath();
    this.context.stroke();

    this.context.strokeStyle = this.colors[2];
    this.context.beginPath();
    this.context.moveTo(0, 0, 10);
    this.context.lineTo(0, 10, 10);
    this.context.lineTo(10, 10, 10);
    this.context.lineTo(10, 0, 10);
    this.context.closePath();
    this.context.stroke();

    this.context.strokeStyle = "black";
    this.context.beginPath();
    this.context.goToOrigin();
    this.context.lineTo(10, 0, 0);
    this.context.lineTo(10, 0, 10);
    this.context.moveTo(10, 0, 0);
    this.context.lineTo(10, 10, 0);
    this.context.closePath();
    this.context.stroke();
}