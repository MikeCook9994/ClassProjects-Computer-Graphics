function Axes(threeDimContext) {
    this.context = threeDimContext;
}

Axes.prototype.Draw = function(length, transformation) {
    this.context.setTransformation(transformation);
    this.context.lineWidth = 1;

    this.context.beginPath();
    this.context.strokeStyle = "rgb(0, 0, 255)";
    this.context.goToOrigin();
    this.context.lineTo(length, 0, 0);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.strokeStyle = "rgb(255, 0, 0)";
    this.context.goToOrigin();
    this.context.lineTo(0, length, 0);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.strokeStyle = "rgb(0, 255, 0)"
    this.context.goToOrigin();
    this.context.lineTo(0, 0, length);
    this.context.stroke();
    this.context.closePath();
}