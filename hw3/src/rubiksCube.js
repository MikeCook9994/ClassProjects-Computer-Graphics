function RubiksCube(threeDimContext) {
    this.context = threeDimContext;
    this.centerPieces = {
        white: null,
        green: null,
        yellow: null,
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
    centerPieces.white = new CenterPiece("lightGray", threeDimContext, whiteChildren);

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
    centerPieces.yellow = new CenterPiece("gold", threeDimContext, yellowChildren);

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
    let finalTransformation = 
        m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), cameraTransformation));

    this.context.setTransformation(finalTransformation);

    this.context.strokeStyle = "black"
    drawSingleCube(this.context);

    let adjustedOrigin = [origin[0], origin[1] + 12, origin[2]];
    let elevatedTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), cameraTransformation));

    let whiteTransformation = elevatedTransformation;
    this.centerPieces.white.Draw(whiteTransformation);

    let redTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateX(cameraTransformation, degreesToRadians(90))));
    this.centerPieces.red.Draw(redTransformation);

    let yellowTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateX(cameraTransformation, degreesToRadians(180))));
    this.centerPieces.yellow.Draw(yellowTransformation);

    let orangeTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateX(cameraTransformation, degreesToRadians(270))));
    this.centerPieces.orange.Draw(orangeTransformation);

    let greenTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateZ(cameraTransformation, degreesToRadians(90))));
    this.centerPieces.green.Draw(greenTransformation);

    let blueTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateZ(cameraTransformation, degreesToRadians(270))));
    this.centerPieces.blue.Draw(blueTransformation);
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

function drawSingleCube(context) {
    context.lineWidth = 1;

    context.Rect(0, 0, 0, 10, 10);

    context.Rect(0, 0, 10, 10, 10);

    context.goToOrigin();
    context.lineTo(0, 0, 10);

    context.moveTo(0, 10, 0);
    context.lineTo(0, 10, 10);

    context.moveTo(10, 10, 0);
    context.lineTo(10, 10, 10);

    context.moveTo(10, 0, 0);
    context.lineTo(10, 0, 10);
    context.stroke();
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}