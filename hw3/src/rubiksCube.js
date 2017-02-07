function RubiksCube(threeDimContext) {
    this.context = threeDimContext;
    this.centerPieces = {
        white: null,
        green: null,
        orange: null,
        blue: null,
        red: null,
        orange: null
    };

    InitializeCubePieces(this.centerPieces, threeDimContext)
}

function InitializeCubePieces(centerPieces, threeDimContext) {
    // Initialize 12 edge pieces
    let whiteOrangeEdge = new EdgePiece(["white", "orange"], threeDimContext);
    let whiteBlueEdge = new EdgePiece(["white", "blue"], threeDimContext);
    let whiteRedEdge = new EdgePiece(["white", "red"], threeDimContext);
    let whiteGreenEdge = new EdgePiece(["white", "green"], threeDimContext);

    let blueRedEdge = new EdgePiece(["blue", "red"], threeDimContext);
    let blueYellowEdge = new EdgePiece(["blue", "yellow"], threeDimContext);
    let blueOrangeEdge = new EdgePiece(["blue", "orange"], threeDimContext);

    let orangeYellowEdge = new EdgePiece(["orange", "yellow"], threeDimContext);
    let orangeGreenEdge = new EdgePiece(["orange", "green"], threeDimContext);``

    let greenYellowEdge = new EdgePiece(["green", "yellow"], threeDimContext);
    let greenRedEdge = new EdgePiece(["green", "red"], threeDimContext);

    let redYellowEdge = new EdgePiece(["red", "yellow"], threeDimContext);

    // Initialize 8 corner pieces
    let whiteOrangeGreenCorner = new CornerPiece(["white", "orange", "green"], threeDimContext);
    let whiteOrangeBlueCorner = new CornerPiece(["white", "orange", "blue"], threeDimContext);
    let whiteBlueRedCorner = new CornerPiece(["white", "blue", "red"], threeDimContext);
    let whiteRedGreenCorner = new CornerPiece(["white", "red", "green"], threeDimContext);

    let yellowOrangeGreenCorner = new CornerPiece(["yellow", "orange", "green"], threeDimContext);
    let yellowOrangeBlueCorner = new CornerPiece(["yellow", "orange", "blue"], threeDimContext);
    let yellowBlueRedCorner = new CornerPiece(["yellow", "blue", "red"], threeDimContext);
    let yellowRedGreenCorner = new CornerPiece(["yellow", "red", "green"], threeDimContext);

    // Intialize 6 center pieces

    // white
    let whiteChildren = {
        left: [whiteOrangeBlueCorner, whiteOrangeEdge, whiteOrangeGreenCorner],
        front: [whiteOrangeGreenCorner, whiteGreenEdge, whiteRedGreenCorner],
        right: [whiteRedGreenCorner, whiteRedEdge, whiteBlueRedCorner],
        back: [whiteBlueRedCorner, whiteBlueEdge, whiteOrangeBlueCorner]
    }
    centerPieces.white = new CenterPiece("white", threeDimContext, whiteChildren);

    // red
    let redChildren = {
        left: [whiteBlueRedCorner, whiteRedEdge, whiteRedGreenCorner],
        front: [whiteRedGreenCorner, greenRedEdge, yellowRedGreenCorner],
        right: [yellowRedGreenCorner, redYellowEdge, yellowBlueRedCorner],
        back: [yellowBlueRedCorner, blueRedEdge, whiteBlueRedCorner]
    }
    centerPieces.red = new CenterPiece("red", threeDimContext, redChildren);

    // yellow
    let yellowChildren = {
        left: [yellowBlueRedCorner, redYellowEdge, yellowRedGreenCorner],
        front: [yellowRedGreenCorner, greenYellowEdge, yellowOrangeGreenCorner],
        right: [yellowOrangeGreenCorner, orangeYellowEdge, yellowOrangeBlueCorner],
        back: [yellowOrangeBlueCorner, blueYellowEdge, yellowBlueRedCorner]
    }
    centerPieces.yellow = new CenterPiece("yellow", threeDimContext, yellowChildren);

    // orange
    let orangeChildren = {
        left: [yellowOrangeBlueCorner, orangeYellowEdge, yellowOrangeGreenCorner],
        front: [yellowOrangeGreenCorner, orangeGreenEdge, whiteOrangeGreenCorner],
        right: [whiteOrangeGreenCorner, whiteOrangeEdge, whiteOrangeBlueCorner],
        back: [whiteOrangeBlueCorner, blueOrangeEdge, yellowOrangeBlueCorner]
    }
    centerPieces.orange = new CenterPiece("orange", threeDimContext, orangeChildren);

    // green
    let greenChildren = {
        left: [whiteOrangeGreenCorner, orangeGreenEdge, yellowOrangeGreenCorner],
        front: [yellowOrangeGreenCorner, greenYellowEdge, yellowRedGreenCorner],
        right: [yellowRedGreenCorner, greenRedEdge, whiteRedGreenCorner],
        back: [whiteRedGreenCorner, whiteGreenEdge, whiteOrangeGreenCorner]
    }
    centerPieces.green = new CenterPiece("green", threeDimContext, greenChildren);

    // blue
    let blueChildren = {
        left: [yellowOrangeBlueCorner, blueOrangeEdge, whiteOrangeBlueCorner],
        front: [whiteOrangeBlueCorner, whiteBlueEdge, whiteBlueRedCorner],
        right: [whiteBlueRedCorner, blueRedEdge, yellowBlueRedCorner],
        back: [yellowBlueRedCorner, blueYellowEdge, yellowOrangeBlueCorner]
    }
    centerPieces.blue = new CenterPiece("blue", threeDimContext, blueChildren);
}

RubiksCube.prototype.Draw = function(cameraTransformation, origin, scale) {
    let translation = m4.translation(origin);
    let scaling = m4.scaling([scale, scale, scale]);
    let finalTransformation = m4.multiply(translation, m4.multiply(scaling, cameraTransformation));

    this.context.setTransformation(finalTransformation);

    this.context.strokeStyle = "black"
    this.context.fillStyle = "rgb(177, 177, 177)"
    this.context.lineWidth = 1;

    this.context.Rect(0, 0, 0, 10, 10);

    this.context.Rect(0, 0, 10, 10, 10);

    this.context.goToOrigin();
    this.context.lineTo(0, 0, 10);

    this.context.moveTo(0, 10, 0);
    this.context.lineTo(0, 10, 10);

    this.context.moveTo(10, 10, 0);
    this.context.lineTo(10, 10, 10);

    this.context.moveTo(10, 0, 0);
    this.context.lineTo(10, 0, 10);
    this.context.stroke();
}

RubiksCube.prototype.Rotate = function(rotation) {
    switch(rotation) {
        case "left":
            break;
        case "left prime":
            break;
        case "front":
            break;
        case "front prime":
            break;
        case "right":
            break;
        case "right prime":
            break;
        case "back":
            break;
        case "back prime":
            break;
        case "top":
            break;
        case "top prime":
            break;
        case "bottom":
            break;
        case "bottom prime":
            break; 
    }
}