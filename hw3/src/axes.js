function Axes(threeDimContext) {
    this.context = threeDimContext;
}

Axes.prototype.Draw = function(length, transformation) {
    this.context.setTransformation(transformation);
    this.context.lineWidth = 1;

    this.context.beginPath();
    this.context.strokeStyle = "rgb(0, 0, 255)";
    this.context.moveTo(-length / 2, 0, 0);
    this.context.lineTo(length / 2, 0, 0);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.strokeStyle = "rgb(255, 0, 0)";
    this.context.moveTo(0, -length / 2, 0);
    this.context.lineTo(0, length / 2, 0);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.strokeStyle = "rgb(0, 255, 0)"
    this.context.moveTo(0, 0, -length / 2);
    this.context.lineTo(0, 0, length / 2);
    this.context.stroke();
    this.context.closePath();
}