function ThreeDimContext(context) {
    this.transformation = null;
    this.context = context;
    this.strokeStyle = "rgb(0, 0, 0)";
    this.fillStyle = "rgb(0, 0, 0)";
    this.lineWidth = 1;
}

ThreeDimContext.prototype.beginPath = function() {
    this.context.beginPath();
}

ThreeDimContext.prototype.closePath = function() {
    this.context.closePath();
}

ThreeDimContext.prototype.setTransformation = function(transformation) {
    this.transformation = transformation;
}

ThreeDimContext.prototype.goToOrigin = function() {
    this.moveTo(0, 0, 0);
}

ThreeDimContext.prototype.lineTo = function(x, y, z) {
    let point = [x, y, z];
    let transformedPoint = m4.transformPoint(this.transformation, point);
    this.context.lineTo(transformedPoint[0], -transformedPoint[1]);
}

ThreeDimContext.prototype.moveTo = function(x, y, z) {
    let point = [x, y, z];
    let transformedPoint = m4.transformPoint(this.transformation, point);
    this.context.moveTo(transformedPoint[0], -transformedPoint[1]);
}

ThreeDimContext.prototype.fillRect = function(x, y, z, width, height) {
    this.context.fillStyle = this.fillStyle;

    //bottom left point
    this.context.beginPath();
    this.moveTo(x, y, z);
    
    // bottom right point
    this.lineTo(x + width, y, z);

    // top right point
    this.lineTo(x + width, y + height, z);
    
    // top left path
    this.lineTo(x, y + height, z);

    this.context.closePath();
    this.context.fill();
}

ThreeDimContext.prototype.Rect = function(x, y, z, width, height) {
    this.context.strokeStyle = this.strokeStyle;

    // bottom left point
    this.context.beginPath();
    this.moveTo(x, y, z);
    
    // bottom right point
    this.lineTo(x + width, y, z);

    // top right point
    this.lineTo(x + width, y + height, z);
    
    // top left path
    this.lineTo(x, y + height, z);

    this.context.closePath();
    this.context.stroke();
}

ThreeDimContext.prototype.stroke = function() {
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();
}