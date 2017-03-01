function CenterPiece(threeDimcontext, color) {
    this.context = threeDimcontext;
    this.color = color;
}

CenterPiece.prototype.Draw = function(transformation) {
    DefineCenterCubeSides(this.context, this.color, transformation);
    DefineCenterCubeEdges(this.context, "black", transformation);
    DefineCenterCubeCorners(this.context, "black", transformation);
}

function DefineCenterCubeEdges(context, color, transformation) {

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

function DefineCenterCubeSides(context, color, transformation) {

    // front
    context.pushGeometry(new Geometry(context, [[-4, -4, 5], [-4, 4, 5], [4, -4, 5]], "black", transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, 5], [4, 4, 5], [-4, 4, 5]], "black", transformation));

    // back
    context.pushGeometry(new Geometry(context, [[-4, -4, -5], [-4, 4, -5], [4, -4, -5]], "black", transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, -5], [4, 4, -5], [-4, 4, -5]], "black", transformation));

    // top
    context.pushGeometry(new Geometry(context, [[-4, 5, -4], [4, 5, -4], [-4, 5, 4]], color, transformation));
    context.pushGeometry(new Geometry(context, [[4, 5, -4], [4, 5, 4], [-4, 5, 4]], color, transformation));

    // bottom
    context.pushGeometry(new Geometry(context, [[-4, -5, -4], [4, -5, -4], [-4, -5, 4]], "black", transformation));
    context.pushGeometry(new Geometry(context, [[4, -5, -4], [4, -5, 4], [-4, -5, 4]],  "black", transformation)); 

    // left
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, 4, -4], [-5, 4, 4]], "black", transformation));
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, -4, 4], [-5, 4, 4]], "black", transformation));

    // right
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, -4, 4], [5, 4, 4]], "black", transformation));
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, 4, -4], [5, 4, 4]], "black", transformation));
}

function DefineCenterCubeCorners(context, color, transformation) {
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