function EdgePiece(threeDimcontext, color1, color2) {
    this.context = threeDimcontext;
    this.color1 = color1;
    this.color2 = color2;
}

EdgePiece.prototype.Draw = function(transformation) {
    DefineEdgeCubeSides(this.context, this.color1, this.color2, transformation);
    DefineEdgeCubeEdges(this.context, "black", transformation);
    DefineEdgeCubeCorners(this.context, "black", transformation);
}

function DefineEdgeCubeEdges(context, color, transformation) {

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

function DefineEdgeCubeSides(context, color1, color2, transformation) {

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
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, 4, -4], [-5, 4, 4]], "black", transformation));
    context.pushGeometry(new Geometry(context, [[-5, -4, -4], [-5, -4, 4], [-5, 4, 4]], "black", transformation));

    // right
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, -4, 4], [5, 4, 4]], "black", transformation));
    context.pushGeometry(new Geometry(context, [[5, -4, -4], [5, 4, -4], [5, 4, 4]], "black", transformation));
}

function DefineEdgeCubeCorners(context, color, transformation) {
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