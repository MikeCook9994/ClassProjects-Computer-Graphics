function CorePiece(threeDimcontext) {
    this.context = threeDimcontext;
    this.planeColor = "black";
}

CorePiece.prototype.Draw = function(transformation) {
    let scaledTransform = m4.multiply(m4.scaling([10, 10, 10]), transformation);
    DefineCubePlanes(this.context, this.planeColor);
    this.context.commitGeometry(scaledTransform);
}

function DefineCubePlanes(context, color) {
    // back
    context.pushGeometry(new Geometry(context, [[-5, -5, -5], [-5, 5, -5], [5, -5, -5]], color));
    context.pushGeometry(new Geometry(context, [[5, -5, -5], [5, 5, -5], [-5, 5, -5]], color));

    //front
    context.pushGeometry(new Geometry(context, [[-5, -5, 5], [-5, 5, 5], [5, -5, 5]], color));
    context.pushGeometry(new Geometry(context, [[5, -5, 5], [5, 5, 5], [-5, 5, 5]], color));

    //left
    context.pushGeometry(new Geometry(context, [[-5, -5, -5], [-5, 5, -5], [-5, 5, 5]], color));
    context.pushGeometry(new Geometry(context, [[-5, -5, -5], [-5, -5, 5], [-5, 5, 5]], color));

    //right
    context.pushGeometry(new Geometry(context, [[5, -5, -5], [5, -5, 5], [5, 5, 5]], color));
    context.pushGeometry(new Geometry(context, [[5, -5, -5], [5, 5, -5], [5, 5, 5]], color));

    // top
    context.pushGeometry(new Geometry(context, [[-5, 5, -5], [5, 5, -5], [-5, 5, 5]], color));
    context.pushGeometry(new Geometry(context, [[5, 5, -5], [5, 5, 5], [-5, 5, 5]], color));

    // bottom
    context.pushGeometry(new Geometry(context, [[-5, -5, -5], [5, -5, -5], [-5, -5, 5]], color));
    context.pushGeometry(new Geometry(context, [[5, -5, -5], [5, -5, 5], [-5, -5, 5]], color));
}