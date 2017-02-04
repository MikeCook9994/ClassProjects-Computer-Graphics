function ThreeDimContext(context) {
    this.context = context;
    this.strokeStyle = "rgb(0, 0, 0)";
    this.fillStyle = "rgb(0, 0, 0)";
    this.strokeWidth = 1;
}

ThreeDimContext.prototype.beginPath = function() {
    this.context.strokeStyle = this.strokeStyle;
    this.context.strokeWidth = this.strokeWidth;
    this.context.beginPath();
}

ThreeDimContext.prototype.closePath = function() {
    this.context.closePath();
}

ThreeDimContext.prototype.lineTo = function(x, y, z, transformation) {
    let point = [x, y, z];
    let transformedPoint = m4.transformPoint(point, transformation);
    this.context.lineTo(tranformedPoint[0], transformedPoint[1]);
}

ThreeDimContext.prototype.moveTo = function(x, y, z, transformation) {
    let point = [x, y, z];
    let transformedPoint = m4.transformPoint(point, transformation);
    this.context.moveTo(tranformedPoint[0], transformedPoint[1]);
}

ThreeDimContext.prototype.fillRect = function(x, y, z, width, height, transformation) {
    this.context.fillStyle = this.fillStyle;

    // top left point
    this.moveTo(x, y, z, transformation);
    this.context.beginPath();
    
    // top right point
    this.lineTo(x + width, y, z, transformation);

    // bottom right point
    this.lineTo(x + width, y + height, z, transformation);
    
    // bottom left path
    this.lineTo(x, y + height, z, transformation);

    this.context.closePath();
    this.context.fill();
}


ThreeDimContext.prototype.stroke = function() {
    this.context.stroke();
}

/*
 * Clears a 2d-square area from (x, y) to (x + width, y + height). Most
 * commonly used for clearning the canvas
 * 
 * e.g. clearRect(0, 0, canvas.width, canvas.height); 
 */
ThreeDimContext.prototype.clearRect = function(x, y, width, height) {
    this.context.clearRect(0, 0, width, height);
}