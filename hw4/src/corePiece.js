function CorePiece(threeDimcontext) {
    this.context = threeDimcontext;
    this.color = "black";
}

CorePiece.prototype.Draw = function(transformation) {
    // back
    this.context.pushGeometry(new Geometry(this.context, [[-5, -5, -5], [-5, 5, -5], [5, -5, -5]], this.color));
    this.context.pushGeometry(new Geometry(this.context, [[5, -5, -5], [5, 5, -5], [-5, 5, -5]], this.color));

    //front
    this.context.pushGeometry(new Geometry(this.context, [[-5, -5, 5], [-5, 5, 5], [5, -5, 5]], this.color));
    this.context.pushGeometry(new Geometry(this.context, [[5, -5, 5], [5, 5, 5], [-5, 5, 5]], this.color));

    //left
    this.context.pushGeometry(new Geometry(this.context, [[-5, -5, -5], [-5, 5, -5], [-5, 5, 5]], this.color));
    this.context.pushGeometry(new Geometry(this.context, [[-5, -5, -5], [-5, -5, 5], [-5, 5, 5]], this.color));

    //right
    this.context.pushGeometry(new Geometry(this.context, [[5, -5, -5], [5, -5, 5], [5, 5, 5]], this.color));
    this.context.pushGeometry(new Geometry(this.context, [[5, -5, -5], [5, 5, -5], [5, 5, 5]], this.color));

    // top
    this.context.pushGeometry(new Geometry(this.context, [[-5, 5, -5], [5, 5, -5], [-5, 5, 5]], this.color));
    this.context.pushGeometry(new Geometry(this.context, [[5, 5, -5], [5, 5, 5], [-5, 5, 5]], this.color));

    // bottom
    this.context.pushGeometry(new Geometry(this.context, [[-5, -5, -5], [5, -5, -5], [-5, -5, 5]], this.color));
    this.context.pushGeometry(new Geometry(this.context, [[5, -5, -5], [5, -5, 5], [-5, -5, 5]], this.color));

    let scaledTransform = m4.multiply(m4.scaling([10, 10, 10]), transformation);
    DrawMainCube(this.context, scaledTransform);

    this.context.commitGeometry(scaledTransform);
}

function DrawMainCube(context, transformation) {
    context.strokeStyle = "gray";
    context.lineWidth = 1;

    context.rect(-5, -5, -5, 10, 10, transformation);

    context.rect(-5, -5, 5, 10, 10, transformation);

    context.moveTo(-5, -5, -5, transformation);
    context.lineTo(-5, -5, 5, transformation);

    context.moveTo(-5, 5, -5, transformation);
    context.lineTo(-5, 5, 5, transformation);

    context.moveTo(5, -5, -5, transformation);
    context.lineTo(5, -5, 5, transformation);

    context.moveTo(5, 5, -5, transformation);
    context.lineTo(5, 5, 5, transformation);
    context.stroke();
}