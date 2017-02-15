function Axes(threeDimContext) {
    this.context = threeDimContext;
}

Axes.prototype.Draw = function(length, transformation) {
    this.context.lineWidth = 1;

    this.context.beginPath();
    this.context.strokeStyle = "rgb(0, 0, 255)";
    this.context.moveTo(-length / 2, 0, 0, transformation);
    this.context.lineTo(length / 2, 0, 0, transformation);
    this.context.stroke();
    this.context.closePath();
    console.log("x axis is blue");

    this.context.beginPath();
    this.context.strokeStyle = "rgb(255, 0, 0)";
    this.context.moveTo(0, -length / 2, 0, transformation);
    this.context.lineTo(0, length / 2, 0, transformation);
    this.context.stroke();
    this.context.closePath();
    console.log("y axis is red");

    this.context.beginPath();
    this.context.strokeStyle = "rgb(0, 255, 0)"
    this.context.moveTo(0, 0, -length / 2, transformation);
    this.context.lineTo(0, 0, length / 2, transformation);
    this.context.stroke();
    this.context.closePath();
    console.log("z axis is greeen");
}