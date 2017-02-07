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

    let whiteOrangeEdge = new EdgePiece(["lightGray", "orange"], threeDimContext);
    let orangeWhiteEdge = new EdgePiece(["orange", "lightGray"], threeDimContext);

    let blueWhiteEdge = new EdgePiece(["blue", "lightGray"], threeDimContext);
    let whiteBlueEdge = new EdgePiece(["lightGray", "Blue"], threeDimContext);

    let redWhiteEdge = new EdgePiece(["red", "lightGray"], threeDimContext);
    let whiteRedEdge = new EdgePiece(["lightGray", "red"], threeDimContext);

    let greenWhiteEdge = new EdgePiece(["green", "lightGray"], threeDimContext);
    let whiteGreenEdge = new EdgePiece(["lightGray", "green"], threeDimContext);

    let redBlueEdge = new EdgePiece(["red", "blue"], threeDimContext);
    let blueRedEdge = new EdgePiece(["blue", "Red"], threeDimContext);

    let blueYellowEdge = new EdgePiece(["blue", "gold"], threeDimContext);
    let yellowBlueEdge = new EdgePiece(["gold", "blue"], threeDimContext);

    let blueOrangeEdge = new EdgePiece(["blue", "orange"], threeDimContext);
    let orangeBlueEdge = new EdgePiece(["orange", "blue"], threeDimContext);

    let orangeYellowEdge = new EdgePiece(["orange", "gold"], threeDimContext);
    let yellowOrangeEdge = new EdgePiece(["gold", "orange"], threeDimContext);

    let orangeGreenEdge = new EdgePiece(["orange", "green"], threeDimContext);
    let greenOrangeEdge = new EdgePiece(["green", "Orange"], threeDimContext);

    let greenYellowEdge = new EdgePiece(["green", "gold"], threeDimContext);
    let yellowGreenEdge = new EdgePiece(["gold", "green"], threeDimContext);

    let redGreenEdge = new EdgePiece(["red", "green"], threeDimContext);
    let greenRedEdge = new EdgePiece(["green", "red"], threeDimContext);

    let redYellowEdge = new EdgePiece(["red", "gold"], threeDimContext);
    let yellowRedEdge = new EdgePiece(["gold", "red"], threeDimContext);


    // Initialize 8 corner pieces
    let whiteOrangeGreenCorner = new CornerPiece(["lightGray", "orange", "green"], threeDimContext);
    let whiteOrangeBlueCorner = new CornerPiece(["lightGray", "orange", "blue"], threeDimContext);
    let whiteBlueRedCorner = new CornerPiece(["lightGray", "blue", "red"], threeDimContext);
    let whiteRedGreenCorner = new CornerPiece(["lightGray", "red", "green"], threeDimContext);

    let yellowOrangeGreenCorner = new CornerPiece(["gold", "orange", "green"], threeDimContext);
    let yellowOrangeBlueCorner = new CornerPiece(["gold", "orange", "blue"], threeDimContext);
    let yellowBlueRedCorner = new CornerPiece(["gold", "blue", "red"], threeDimContext);
    let yellowRedGreenCorner = new CornerPiece(["gold", "red", "green"], threeDimContext);

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
        left: [whiteBlueRedCorner, redWhiteEdge, whiteRedGreenCorner],
        front: [whiteRedGreenCorner, redGreenEdge, yellowRedGreenCorner],
        right: [yellowRedGreenCorner, redYellowEdge, yellowBlueRedCorner],
        back: [yellowBlueRedCorner, redBlueEdge, whiteBlueRedCorner]
    }
    centerPieces.red = new CenterPiece("red", threeDimContext, redChildren);

    // yellow
    let yellowChildren = {
        left: [yellowBlueRedCorner, yellowRedEdge, yellowRedGreenCorner],
        front: [yellowRedGreenCorner, yellowGreenEdge, yellowOrangeGreenCorner],
        right: [yellowOrangeGreenCorner, yellowOrangeEdge, yellowOrangeBlueCorner],
        back: [yellowOrangeBlueCorner, yellowBlueEdge, yellowBlueRedCorner]
    }
    centerPieces.yellow = new CenterPiece("gold", threeDimContext, yellowChildren);

    // orange
    let orangeChildren = {
        left: [yellowOrangeBlueCorner, orangeYellowEdge, yellowOrangeGreenCorner],
        front: [yellowOrangeGreenCorner, orangeGreenEdge, whiteOrangeGreenCorner],
        right: [whiteOrangeGreenCorner, orangeWhiteEdge, whiteOrangeBlueCorner],
        back: [whiteOrangeBlueCorner, orangeBlueEdge, yellowOrangeBlueCorner]
    }
    centerPieces.orange = new CenterPiece("orange", threeDimContext, orangeChildren);

    // green
    let greenChildren = {
        left: [whiteOrangeGreenCorner, greenOrangeEdge, yellowOrangeGreenCorner],
        front: [yellowOrangeGreenCorner, greenYellowEdge, yellowRedGreenCorner],
        right: [yellowRedGreenCorner, greenRedEdge, whiteRedGreenCorner],
        back: [whiteRedGreenCorner, greenWhiteEdge, whiteOrangeGreenCorner]
    }
    centerPieces.green = new CenterPiece("green", threeDimContext, greenChildren);

    // blue
    let blueChildren = {
        left: [yellowOrangeBlueCorner, blueOrangeEdge, whiteOrangeBlueCorner],
        front: [whiteOrangeBlueCorner, blueWhiteEdge, whiteBlueRedCorner],
        right: [whiteBlueRedCorner, blueRedEdge, yellowBlueRedCorner],
        back: [yellowBlueRedCorner, blueYellowEdge, yellowOrangeBlueCorner]
    }
    centerPieces.blue = new CenterPiece("blue", threeDimContext, blueChildren);
}

RubiksCube.prototype.Draw = function(cameraTransformation, origin, scale) {
    let finalTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), cameraTransformation));
    this.context.setTransformation(finalTransformation);

    DrawMainCube(this.context);
    DrawCenterCubes(this.centerPieces, this.context, origin, scale, cameraTransformation)
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

function DrawMainCube(context) {
    context.strokeStyle = "black";
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

function DrawCenterCubes(centerPieces, context, origin, scale, cameraTransformation) {
    let adjustedOrigin = [origin[0], origin[1], origin[2] + 40];

    let whiteTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateZ(m4.rotateX(cameraTransformation, DegreesToRadians(270)), DegreesToRadians(90))));
    centerPieces.white.Draw(whiteTransformation);

    let redTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateZ(m4.rotateY(cameraTransformation, DegreesToRadians(180)), DegreesToRadians(270))));
    centerPieces.red.Draw(redTransformation);

    let yellowTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateZ(m4.rotateX(cameraTransformation, DegreesToRadians(90)), DegreesToRadians(90))));
    centerPieces.yellow.Draw(yellowTransformation);

    let orangeTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateZ(m4.rotateY(cameraTransformation, DegreesToRadians(0)), DegreesToRadians(90))));
    centerPieces.orange.Draw(orangeTransformation);

    let greenTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateY(cameraTransformation, DegreesToRadians(90))));
    centerPieces.green.Draw(greenTransformation);

    let blueTransformation = m4.multiply(m4.translation(adjustedOrigin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateY(m4.rotateX(cameraTransformation, DegreesToRadians(180)), DegreesToRadians(270))));
    centerPieces.blue.Draw(blueTransformation);
}

function DegreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}