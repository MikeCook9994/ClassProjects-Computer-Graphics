function ThreeDimContext(context) {
    this.context = context;
    this.strokeStyle = "rgb(0, 0, 0)";
    this.fillStyle = "rgb(0, 0, 0)";
    this.lineWidth = 1;
    this.geometryQueue = [];
}

ThreeDimContext.prototype.beginPath = function() {
    this.context.beginPath();
}

ThreeDimContext.prototype.closePath = function() {
    this.context.closePath();
}

ThreeDimContext.prototype.goToOrigin = function(transformation) {
    this.moveTo(0, 0, 0, transformation);
}

ThreeDimContext.prototype.lineTo = function(x, y, z, transformation) {
    let point = [x, y, z];
    let transformedPoint = m4.transformPoint(transformation, point);
    this.context.lineTo(transformedPoint[0], transformedPoint[1]);
}

ThreeDimContext.prototype.moveTo = function(x, y, z, transformation) {
    let point = [x, y, z];
    let transformedPoint = m4.transformPoint(transformation, point);
    this.context.moveTo(transformedPoint[0], transformedPoint[1]);
}

ThreeDimContext.prototype.rect = function(x, y, z, width, height, transformation) {
    this.context.strokeStyle = this.strokeStyle;

    // bottom left point
    this.context.beginPath();
    this.moveTo(x, y, z, transformation);
    
    // bottom right point
    this.lineTo(x + width, y, z, transformation);

    // top right point
    this.lineTo(x + width, y + height, z, transformation);
    
    // top left path
    this.lineTo(x, y + height, z, transformation);

    this.context.closePath();
    this.context.stroke();
}

ThreeDimContext.prototype.stroke = function() {
    this.context.lineWidth = this.lineWidth;
    this.context.strokeStyle = this.strokeStyle;
    this.context.stroke();
}

ThreeDimContext.prototype.fill = function() {
    this.context.lineWidth = this.lineWidth;
    this.context.fillStyle = this.fillStyle;
    this.context.fill();
}

ThreeDimContext.prototype.clearRect = function(x, y, height, width) {
    this.context.clearRect(x, y, height, width);
}

ThreeDimContext.prototype.pushGeometry = function(geometry) {
    this.geometryQueue.push(geometry);
}

ThreeDimContext.prototype.commitGeometry = function(transformation) {
    this.geometryQueue = this.geometryQueue.sort((a, b) => {
        if(a.depth < b.depth) {
            return -1;
        }
        else if(a.depth > b.depth) {
            return 1;
        }
        return 0;
    });

    this.geometryQueue.forEach((geometry) => {
        geometry.Draw(transformation);
    });

    this.geometryQueue = [];
}