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
    context.pushGeometry(new Geometry(context, [[-4, -4, -5], [-4, 4, -5], [4, -4, -5]], color));
    context.pushGeometry(new Geometry(context, [[4, -4, -5], [4, 4, -5], [-4, 4, -5]], color));

    // back corners
    context.pushGeometry(new Geometry(context, [[-4, -4, -5], [-5, -4, -4], [-4, -5, -4]], color));
    context.pushGeometry(new Geometry(context, [[4, -4, -5], [5, -4, -4], [4, -5, -4]], color));  
    context.pushGeometry(new Geometry(context, [[-4, 4, -5], [-5, 4, -4], [-4, 5, -4]], color));  
    context.pushGeometry(new Geometry(context, [[4, 4, -5], [5, 4, -4], [4, 5, -4]], color)); 

    // back edges
    context.pushGeometry(new Geometry(context, [[-4, -4, -5], [-5, -4, -4], [-5, 4, -4]], color));
    context.pushGeometry(new Geometry(context, [[-4, 4, -5], [-5, 4, -4], [-4, -4, -5]], color)); 
    context.pushGeometry(new Geometry(context, [[4, -4, -5], [5, -4, -4], [5, 4, -4]], color));
    context.pushGeometry(new Geometry(context, [[4, 4, -5], [5, 4, -4], [4, -4, -5]], color)); 

    // front
    context.pushGeometry(new Geometry(context, [[-4, -4, 5], [-4, 4, 5], [4, -4, 5]], color));
    context.pushGeometry(new Geometry(context, [[4, -4, 5], [4, 4, 5], [-4, 4, 5]], color));

    // front corners
    context.pushGeometry(new Geometry(context, [[-4, -4, 5], [-5, -4, 4], [-4, -5, 4]], color));
    context.pushGeometry(new Geometry(context, [[4, -4, 5], [5, -4, 4], [4, -5, 4]], color));  
    context.pushGeometry(new Geometry(context, [[-4, 4, 5], [-5, 4, 4], [-4, 5, 4]], color));  
    context.pushGeometry(new Geometry(context, [[4, 4, 5], [5, 4, 4], [4, 5, 4]], color));

    // front edges
    context.pushGeometry(new Geometry(context, [[-4, -4, 5], [-5, -4, 4], [-5, 4, 4]], color));
    context.pushGeometry(new Geometry(context, [[-4, 4, 5], [-5, 4, 4], [-4, -4, 5]], color)); 
    context.pushGeometry(new Geometry(context, [[4, -4, 5], [5, -4, 4], [5, 4, 4]], color));
    context.pushGeometry(new Geometry(context, [[4, 4, 5], [5, 4, 4], [4, -4, 5]], color));

    // left
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, 4, -4], [-5, 4, 4]], color));
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, -4, 4], [-5, 4, 4]], color));

    // right
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, -4, 4], [5, 4, 4]], color));
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, 4, -4], [5, 4, 4]], color));

    // top
    context.pushGeometry(new Geometry(context, [[-4, 5, -4], [4, 5, -4], [-4, 5, 4]], color));
    context.pushGeometry(new Geometry(context, [[4, 5, -4], [4, 5, 4], [-4, 5, 4]], color));

    // top edges
    context.pushGeometry(new Geometry(context, [[-5, 4, -4], [-4, 5, -4], [-4, 5, 4]], color));
    context.pushGeometry(new Geometry(context, [[-5, 4, 4], [-4, 5, 4], [-5, 4, -4]], color));
    context.pushGeometry(new Geometry(context, [[5, 4, -4], [4, 5, -4], [4, 5, 4]], color));
    context.pushGeometry(new Geometry(context, [[5, 4, 4], [4, 5, 4], [5, 4, -4]], color));

    // bottom
    context.pushGeometry(new Geometry(context, [[-4, -5, -4], [4, -5, -4], [-4, -5, 4]], color));
    context.pushGeometry(new Geometry(context, [[4, -5, -4], [4, -5, 4], [-4, -5, 4]], color)); 

    // bottom edges
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-4, -5, -4], [-4, -5, 4]], color));
    context.pushGeometry(new Geometry(context, [[-5, -4, 4], [-4, -5, 4], [-5, -4, -4]], color));
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [4, -5, -4], [4, -5, 4]], color));
    context.pushGeometry(new Geometry(context, [[5, -4, 4], [4, -5, 4], [5, -4, -4]], color));
}

function GetRandomColor() {
    return "rgb(" + 
        Math.floor(Math.random() * 255) + ", " + 
        Math.floor(Math.random() * 255) + ", " + 
        Math.floor(Math.random() * 255) + ")"
}