function CenterPiece(color, threeDimContext, children) {
    this.context = threeDimContext;
    this.color = color;
    this.children = children;
}

CenterPiece.prototype.Draw = function(transformation) {
    this.context.setTransformation(transformation);
    DrawCenterCube(this.context, this.color);

    let leftTransformation = m4.multiply(m4.translation([-40, -40, 0]), transformation);
    DrawRow(this.context, this.children.left, leftTransformation);

    let frontTransformation = m4.rotateZ(m4.multiply(m4.translation([50, -40, 0]), transformation), DegreesToRadians(90));
    DrawRow(this.context, this.children.front, frontTransformation);

    let rightTransformation = m4.rotateZ(m4.multiply(m4.translation([50, 50, 0]), transformation), DegreesToRadians(180));
    DrawRow(this.context, this.children.right, rightTransformation);

    let backTransformation = m4.rotateZ(m4.multiply(m4.translation([-40, 50, 0]), transformation), DegreesToRadians(270));
    DrawRow(this.context, this.children.back, backTransformation);
}

function DrawCenterCube(context, color) {
    context.lineWidth = 1;

    context.strokeStyle = "black";
    context.beginPath();
    context.Rect(0, 0, 0, 10, 10);
    context.closePath();
    context.stroke();

    context.strokeStyle = color
    context.beginPath();
    context.Rect(0, 0, 10, 10, 10);
    context.closePath();
    context.stroke();

    context.strokeStyle = "black";
    context.beginPath();
    context.goToOrigin();
    context.lineTo(0, 0, 10);

    context.moveTo(0, 10, 0);
    context.lineTo(0, 10, 10);

    context.moveTo(10, 10, 0);
    context.lineTo(10, 10, 10);

    context.moveTo(10, 0, 0);
    context.lineTo(10, 0, 10);
    context.closePath();
    context.stroke();
}

function DrawRow(context, row, transformation) {
    context.setTransformation(transformation);
    row[2].Draw();

    context.setTransformation(m4.multiply(m4.translation([0, 40, 0]), transformation));
    row[1].Draw();

    context.setTransformation(m4.multiply(m4.translation([0, 80, 0]), transformation));
    row[0].Draw();
}