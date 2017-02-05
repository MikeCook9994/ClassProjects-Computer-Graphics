function Axes(threeDimContext) {
    this.context = threeDimContext;
}

Axes.prototype.Draw = function(length, transformation) {
    this.context.lineWidth = 1;

    this.context.beginPath();
    this.context.strokeStyle = "rgb(0, 0, 255)";
    this.context.moveTo(0, 0, 0, transformation);
    this.context.lineTo(length, 0, 0, transformation);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.strokeStyle = "rgb(255, 0, 0)";
    this.context.moveTo(0, 0, 0, transformation);
    this.context.lineTo(0, length, 0, transformation);
    this.context.stroke();
    this.context.closePath();

    this.context.beginPath();
    this.context.strokeStyle = "rgb(0, 255, 0)"
    this.context.moveTo(0, 0, 0, transformation);
    this.context.lineTo(0, 0, length, transformation);
    this.context.stroke();
    this.context.closePath();
}