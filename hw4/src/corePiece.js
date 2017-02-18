function CorePiece(threeDimcontext) {
    this.context = threeDimcontext;
    this.planeColor = "black";
}

CorePiece.prototype.Draw = function(transformation) {
    let scaledTransform = m4.multiply(m4.scaling([10, 10, 10]), transformation);
    DefineCubePlanes(this.context, this.planeColor, scaledTransform);
    this.context.commitGeometry(scaledTransform);
}

function DefineCubePlanes(context, color, transformation) {
    DefineCubeSides(context, color, transformation);
    DefineCubeEdges(context, color, transformation);
    DefineCubeCorners(context, color, transformation);
}

function GetRandomColor() {
    return "rgb(" + 
        Math.floor(Math.random() * 255) + ", " + 
        Math.floor(Math.random() * 255) + ", " + 
        Math.floor(Math.random() * 255) + ")"
}

function DefineCubeEdges(context, color, transformation) {
    // front edges
    context.pushGeometry(new Geometry(context, [[-4, -4, 5], [-5, -4, 4], [-5, 4, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[-4, 4, 5], [-5, 4, 4], [-4, -4, 5]], color, transformation)); 
    context.pushGeometry(new Geometry(context, [[4, -4, 5], [5, -4, 4], [5, 4, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, 4, 5], [5, 4, 4], [4, -4, 5]], color, transformation));

    context.pushGeometry(new Geometry(context, [[-4, 4, 5], [-4, 5, 4], [4, 4, 5]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, 4, 5], [4, 5, 4], [-4, 5, 4]], color, transformation)); 
    context.pushGeometry(new Geometry(context, [[-4, -4, 5], [-4, -5, 4], [4, -4, 5]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, 5], [4, -5, 4], [-4, -5, 4]], color, transformation)); 

    // back edges
    context.pushGeometry(new Geometry(context, [[-4, -4, -5], [-5, -4, -4], [-5, 4, -4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[-4, 4, -5], [-5, 4, -4], [-4, -4, -5]], color, transformation)); 
    context.pushGeometry(new Geometry(context, [[4, -4, -5], [5, -4, -4], [5, 4, -4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, 4, -5], [5, 4, -4], [4, -4, -5]], color, transformation)); 

    context.pushGeometry(new Geometry(context, [[-4, 4, -5], [-4, 5, -4], [4, 4, -5]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, 4, -5], [4, 5, -4], [-4, 5, -4]], color, transformation)); 
    context.pushGeometry(new Geometry(context, [[-4, -4, -5], [-4, -5, -4], [4, -4, -5]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, -5], [4, -5, -4], [-4, -5, -4]], color, transformation)); 

    // top edges
    context.pushGeometry(new Geometry(context, [[-5, 4, -4], [-4, 5, -4], [-4, 5, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[-5, 4, 4], [-4, 5, 4], [-5, 4, -4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[5, 4, -4], [4, 5, -4], [4, 5, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[5, 4, 4], [4, 5, 4], [5, 4, -4]], color, transformation));

    // bottom edges
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-4, -5, -4], [-4, -5, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[-5, -4, 4], [-4, -5, 4], [-5, -4, -4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [4, -5, -4], [4, -5, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[5, -4, 4], [4, -5, 4], [5, -4, -4]], color, transformation));
}

function DefineCubeSides(context, color, transformation) {

    // front
    context.pushGeometry(new Geometry(context, [[-4, -4, 5], [-4, 4, 5], [4, -4, 5]], "green", transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, 5], [4, 4, 5], [-4, 4, 5]], "green", transformation));

    // back
    context.pushGeometry(new Geometry(context, [[-4, -4, -5], [-4, 4, -5], [4, -4, -5]], "blue", transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, -5], [4, 4, -5], [-4, 4, -5]], "blue", transformation));

    // top
    context.pushGeometry(new Geometry(context, [[-4, 5, -4], [4, 5, -4], [-4, 5, 4]], "gray", transformation));
    context.pushGeometry(new Geometry(context, [[4, 5, -4], [4, 5, 4], [-4, 5, 4]], "gray", transformation));

    // bottom
    context.pushGeometry(new Geometry(context, [[-4, -5, -4], [4, -5, -4], [-4, -5, 4]], "gold", transformation));
    context.pushGeometry(new Geometry(context, [[4, -5, -4], [4, -5, 4], [-4, -5, 4]], "gold", transformation)); 

    // left
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, 4, -4], [-5, 4, 4]], "orange", transformation));
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, -4, 4], [-5, 4, 4]], "orange", transformation));

    // right
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, -4, 4], [5, 4, 4]], "red", transformation));
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, 4, -4], [5, 4, 4]], "red", transformation));
}

function DefineCubeCorners(context, color, transformation) {
    // back corners
    context.pushGeometry(new Geometry(context, [[-4, -4, -5], [-5, -4, -4], [-4, -5, -4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, -5], [5, -4, -4], [4, -5, -4]], color, transformation));  
    context.pushGeometry(new Geometry(context, [[-4, 4, -5], [-5, 4, -4], [-4, 5, -4]], color, transformation));  
    context.pushGeometry(new Geometry(context, [[4, 4, -5], [5, 4, -4], [4, 5, -4]], color, transformation)); 

    // front corners
    context.pushGeometry(new Geometry(context, [[-4, -4, 5], [-5, -4, 4], [-4, -5, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, 5], [5, -4, 4], [4, -5, 4]], color, transformation));  
    context.pushGeometry(new Geometry(context, [[-4, 4, 5], [-5, 4, 4], [-4, 5, 4]], color, transformation));  
    context.pushGeometry(new Geometry(context, [[4, 4, 5], [5, 4, 4], [4, 5, 4]], color, transformation));
}