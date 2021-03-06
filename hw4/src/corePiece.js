function CorePiece(threeDimcontext) {
    this.context = threeDimcontext;
    this.color = "black";
}

CorePiece.prototype.Draw = function(transformation) {
    DefineCubeSides(this.context, this.color, transformation);
    DefineCubeEdges(this.context, this.color, transformation);
    DefineCubeCorners(this.context, this.color, transformation);
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
    context.pushGeometry(new Geometry(context, [[-4, -4, 5], [-4, 4, 5], [4, -4, 5]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, 5], [4, 4, 5], [-4, 4, 5]], color, transformation));

    // back
    context.pushGeometry(new Geometry(context, [[-4, -4, -5], [-4, 4, -5], [4, -4, -5]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, -5], [4, 4, -5], [-4, 4, -5]], color, transformation));

    // top
    context.pushGeometry(new Geometry(context, [[-4, 5, -4], [4, 5, -4], [-4, 5, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, 5, -4], [4, 5, 4], [-4, 5, 4]], color, transformation));

    // bottom
    context.pushGeometry(new Geometry(context, [[-4, -5, -4], [4, -5, -4], [-4, -5, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, -5, -4], [4, -5, 4], [-4, -5, 4]],  color, transformation)); 

    // left
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, 4, -4], [-5, 4, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, -4, 4], [-5, 4, 4]], color, transformation));

    // right
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, -4, 4], [5, 4, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, 4, -4], [5, 4, 4]], color, transformation));
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