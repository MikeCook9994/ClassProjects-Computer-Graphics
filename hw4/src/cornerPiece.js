function CornerPiece(threeDimcontext, color1, color2, color3) {
    this.context = threeDimcontext;
    this.color1 = color1;
    this.color2 = color2;
    this.color3 = color3;
}

CornerPiece.prototype.Draw = function(transformation) {
    DefineCornerCubeSides(this.context, this.color1, this.color2, this.color3, transformation);
    DefineCornerCubeEdges(this.context, "black", transformation);
    DefineCornerCubeCorners(this.context, "black", transformation);
}

function DefineCornerCubeEdges(context, color, transformation) {

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

function DefineCornerCubeSides(context, color1, color2, color3, transformation) {

    // front
    context.pushGeometry(new Geometry(context, [[-4, -4, 5], [-4, 4, 5], [4, -4, 5]], color1, transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, 5], [4, 4, 5], [-4, 4, 5]], color1, transformation));

    // back
    context.pushGeometry(new Geometry(context, [[-4, -4, -5], [-4, 4, -5], [4, -4, -5]], "black", transformation));
    context.pushGeometry(new Geometry(context, [[4, -4, -5], [4, 4, -5], [-4, 4, -5]], "black", transformation));

    // top
    context.pushGeometry(new Geometry(context, [[-4, 5, -4], [4, 5, -4], [-4, 5, 4]], color2, transformation));
    context.pushGeometry(new Geometry(context, [[4, 5, -4], [4, 5, 4], [-4, 5, 4]], color2, transformation));

    // bottom
    context.pushGeometry(new Geometry(context, [[-4, -5, -4], [4, -5, -4], [-4, -5, 4]], "black", transformation));
    context.pushGeometry(new Geometry(context, [[4, -5, -4], [4, -5, 4], [-4, -5, 4]], "black", transformation)); 

    // left
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, 4, -4], [-5, 4, 4]], color3, transformation));
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, -4, 4], [-5, 4, 4]], color3, transformation));

    // right
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, -4, 4], [5, 4, 4]], "black", transformation));
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, 4, -4], [5, 4, 4]], "black", transformation));
}

function DefineCornerCubeCorners(context, color, transformation) {
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