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

    // Initialize Center and  Corner Pieces
    // white
    let whiteOrangeBlueLeftCorner = new LeftCornerPiece(["blue", "orange", "lightGray"], threeDimContext);
    let whiteOrangeBlueRightCorner = new RightCornerPiece(["blue", "orange", "lightGray"], threeDimContext);

    let whiteOrangeGreenLeftCorner = new LeftCornerPiece(["orange", "green", "lightGray"], threeDimContext);
    let whiteOrangeGreenRightCorner = new RightCornerPiece(["orange", "green", "lightGray"], threeDimContext);

    let whiteGreenRedLeftCorner = new LeftCornerPiece(["green", "red", "lightGray"], threeDimContext);
    let whiteGreenRedRightCorner = new RightCornerPiece(["green", "red", "lightGray"], threeDimContext);

    let whiteRedBlueLeftCorner = new LeftCornerPiece(["red", "blue", "lightGray"], threeDimContext);
    let whiteRedBlueRightCorner = new RightCornerPiece(["red", "blue", "lightGray"], threeDimContext);

    let whiteChildren = {
        left: [whiteOrangeBlueLeftCorner, whiteOrangeEdge, whiteOrangeGreenRightCorner],
        front: [whiteOrangeGreenLeftCorner, whiteGreenEdge, whiteGreenRedRightCorner],
        right: [whiteGreenRedLeftCorner, whiteRedEdge, whiteRedBlueRightCorner],
        back: [whiteRedBlueLeftCorner, whiteBlueEdge, whiteOrangeBlueRightCorner]
    }
    centerPieces.white = new CenterPiece("lightGray", threeDimContext, whiteChildren);

    let redBlueWhiteLeftCorner = new LeftCornerPiece(["blue", "lightGray", "red"], threeDimContext);
    let redBlueWhiteRightCorner = new RightCornerPiece(["blue", "lightGray", "red"], threeDimContext);

    let redWhiteGreenLeftCorner = new LeftCornerPiece(["lightGray", "green", "red"], threeDimContext);
    let redWhiteGreenRightCorner = new RightCornerPiece(["lightGray", "green", "red"], threeDimContext);

    let redYellowGreenLeftCorner = new LeftCornerPiece(["green", "gold", "red"], threeDimContext);
    let redYellowGreenRightCorner = new RightCornerPiece(["green", "gold", "red"], threeDimContext);

    let redBlueYellowLeftCorner = new LeftCornerPiece(["gold", "blue", "red"], threeDimContext);
    let redBlueYellowRightCorner = new RightCornerPiece(["gold", "blue", "red"], threeDimContext);

    // red
    let redChildren = {
        left: [redBlueWhiteLeftCorner, redWhiteEdge, redWhiteGreenRightCorner],
        front: [redWhiteGreenLeftCorner, redGreenEdge, redYellowGreenRightCorner],
        right: [redYellowGreenLeftCorner, redYellowEdge, redBlueYellowRightCorner],
        back: [redBlueYellowLeftCorner, redBlueEdge, redBlueWhiteRightCorner]
    }
    centerPieces.red = new CenterPiece("red", threeDimContext, redChildren);

    // yellow
    let yellowBlueRedLeftCorner = new LeftCornerPiece(["blue", "red", "gold"], threeDimContext);
    let yellowBlueRedRightCorner = new RightCornerPiece(["blue", "red", "gold"], threeDimContext);

    let yellowRedGreenLeftCorner = new LeftCornerPiece(["red", "green", "gold"], threeDimContext);
    let yellowRedGreenRightCorner = new RightCornerPiece(["red", "green", "gold"], threeDimContext);

    let yellowOrangeGreenLeftCorner = new LeftCornerPiece(["green", "orange", "gold"], threeDimContext);
    let yellowOrangeGreenRightCorner = new RightCornerPiece(["green", "orange", "gold"], threeDimContext);

    let yellowOrangeBlueLeftCorner = new LeftCornerPiece(["orange", "blue", "gold"], threeDimContext);
    let yellowOrangeBlueRightCorner = new RightCornerPiece(["orange", "blue", "gold"], threeDimContext);

    let yellowChildren = {
        left: [yellowBlueRedLeftCorner, yellowRedEdge, yellowRedGreenRightCorner],
        front: [yellowRedGreenLeftCorner, yellowGreenEdge, yellowOrangeGreenRightCorner],
        right: [yellowOrangeGreenLeftCorner, yellowOrangeEdge, yellowOrangeBlueRightCorner],
        back: [yellowOrangeBlueLeftCorner, yellowBlueEdge, yellowBlueRedRightCorner]
    }
    centerPieces.yellow = new CenterPiece("gold", threeDimContext, yellowChildren);

    // orange
    let orangeBlueYellowLeftCorner = new LeftCornerPiece(["blue", "gold", "orange"], threeDimContext);
    let orangeBlueYellowRightCorner = new RightCornerPiece(["blue", "gold", "orange"], threeDimContext);

    let orangeYellowGreenLeftCorner = new LeftCornerPiece(["gold", "green", "orange"], threeDimContext);
    let orangeYellowGreenRightCorner = new RightCornerPiece(["gold", "green", "orange"], threeDimContext);

    let orangeGreenWhiteLeftCorner = new LeftCornerPiece(["green", "lightGray", "orange"], threeDimContext);
    let orangeGreenWhiteRightCorner = new RightCornerPiece(["green", "lightGray", "orange"], threeDimContext);

    let orangeWhiteBlueLeftCorner = new LeftCornerPiece(["lightGray", "blue", "orange"], threeDimContext);
    let orangeWhiteBlueRightCorner = new RightCornerPiece(["lightGray", "blue", "orange"], threeDimContext);
    
    let orangeChildren = {
        left: [orangeBlueYellowLeftCorner, orangeYellowEdge, orangeYellowGreenRightCorner],
        front: [orangeYellowGreenLeftCorner, orangeGreenEdge, orangeGreenWhiteRightCorner],
        right: [orangeGreenWhiteLeftCorner, orangeWhiteEdge, orangeWhiteBlueRightCorner],
        back: [orangeWhiteBlueLeftCorner, orangeBlueEdge, orangeBlueYellowRightCorner]
    }
    centerPieces.orange = new CenterPiece("orange", threeDimContext, orangeChildren);

    // green
    let greenWhiteOrangeLeftCorner = new LeftCornerPiece(["lightGray", "orange", "green"], threeDimContext);
    let greenWhiteOrangeRightCorner = new RightCornerPiece(["lightGray", "orange", "green"], threeDimContext);

    let greenOrangeYellowLeftCorner = new LeftCornerPiece(["orange", "gold", "green"], threeDimContext);
    let greenOrangeYellowRightCorner = new RightCornerPiece(["orange", "gold", "green"], threeDimContext);

    let greenYellowRedLeftCorner = new LeftCornerPiece(["gold", "red", "green"], threeDimContext);
    let greenYellowRedRightCorner = new RightCornerPiece(["gold", "red", "green"], threeDimContext);

    let greenRedWhiteLeftCorner = new LeftCornerPiece(["red", "lightGray", "green"], threeDimContext);
    let greenRedWhiteRightCorner = new RightCornerPiece(["red", "lightGray", "green"], threeDimContext);

    let greenChildren = {
        left: [greenWhiteOrangeLeftCorner, greenOrangeEdge, greenOrangeYellowRightCorner],
        front: [greenOrangeYellowLeftCorner, greenYellowEdge, greenYellowRedRightCorner],
        right: [greenYellowRedLeftCorner, greenRedEdge, greenRedWhiteRightCorner],
        back: [greenRedWhiteLeftCorner, greenWhiteEdge, greenWhiteOrangeRightCorner]
    }
    centerPieces.green = new CenterPiece("green", threeDimContext, greenChildren);

    // blue
    let blueYellowOrangeLeftCorner = new LeftCornerPiece(["gold", "orange", "blue"], threeDimContext);
    let blueYellowOrangeRightCorner = new RightCornerPiece(["gold", "orange", "blue"], threeDimContext);

    let blueOrangeWhiteLeftCorner = new LeftCornerPiece(["orange", "lightGray", "blue"], threeDimContext);
    let blueOrangeWhiteRightCorner = new RightCornerPiece(["orange", "lightGray", "blue"], threeDimContext);

    let blueWhiteRedLeftCorner = new LeftCornerPiece(["lightGray", "red", "blue"], threeDimContext);
    let blueWhiteRedRightCorner = new RightCornerPiece(["lightGray", "red", "blue"], threeDimContext);

    let blueRedYellowLeftCorner = new LeftCornerPiece(["red", "gold", "blue"], threeDimContext);
    let blueRedYellowRightCorner = new RightCornerPiece(["red", "gold", "blue"], threeDimContext);

    let blueChildren = {
        left: [blueYellowOrangeLeftCorner, blueOrangeEdge, blueOrangeWhiteRightCorner],
        front: [blueOrangeWhiteLeftCorner, blueWhiteEdge, blueWhiteRedRightCorner],
        right: [blueWhiteRedLeftCorner, blueRedEdge, blueRedYellowRightCorner],
        back: [blueRedYellowLeftCorner, blueYellowEdge, blueYellowOrangeRightCorner]
    }
    centerPieces.blue = new CenterPiece("blue", threeDimContext, blueChildren);
}

RubiksCube.prototype.Draw = function(cameraTransformation, origin, scale) {
    let finalTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), cameraTransformation));
    this.context.setTransformation(finalTransformation);

    DrawMainCube(this.context);
    DrawCenterCubes(this.centerPieces, this.context, origin, scale, cameraTransformation)
}

RubiksCube.prototype.Rotate = function(rotation, cameraTransformation, origin, scale, canvasHeight, canvasWidth) {
    let i = 1;
    switch(rotation) {
        case 'left':
            break;
        case 'left prime':
            break;
        case 'front':
            break;
        case 'front prime':
            break;
        case 'right':
            break;
        case 'right prime':
            break;
        case 'back':
            break;
        case 'back prime':
            break;
        case 'top':
            i = 1;
            let topRotation = function(centerPieces, context, callback) {
                context.clearRect(-canvasWidth / 2, -canvasHeight / 2, canvas.width, canvas.height);
                let rotation = m4.rotateY(cameraTransformation, DegreesToRadians(i * 2)); 
                DrawWhiteLayer(centerPieces, context, [origin[0], origin[1], origin[2] + 40], scale, rotation);
                callback();
                i++
                if(i <= 45) {
                    requestAnimationFrame(() => {topRotation(centerPieces, context, callback)});
                }
                else {
                    let tempLeft = centerPieces.white.children.left;
                    let tempFront = centerPieces.white.children.front;
                    let tempRight = centerPieces.white.children.right;

                    centerPieces.white.children.left = centerPieces.white.children.back;
                    centerPieces.white.children.front = tempLeft;
                    centerPieces.white.children.right = tempFront;
                    centerPieces.white.children.back = tempRight;
                }
            }

            requestAnimationFrame(() => {
                topRotation(this.centerPieces, this.context, (() => {

                    let finalTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), cameraTransformation));
                    this.context.setTransformation(finalTransformation);
                    DrawMainCube(this.context);

                    let adjustedOrigin = [origin[0], origin[1], origin[2] + 40];
                    DrawYellowLayer(this.centerPieces, this.context, adjustedOrigin, scale, cameraTransformation);
                }));
            });
            break;
        case 'top prime':
            i = 1;
            let topPrimeRotation = function(centerPieces, context, callback) {
                context.clearRect(-canvasWidth / 2, -canvasHeight / 2, canvas.width, canvas.height);
                let rotation = m4.rotateY(cameraTransformation, DegreesToRadians((-i * 2))); 
                DrawWhiteLayer(centerPieces, context, [origin[0], origin[1], origin[2] + 40], scale, rotation);
                callback();
                i++
                if(i <= 45) {
                    requestAnimationFrame(() => {topPrimeRotation(centerPieces, context, callback)});
                }
                else {
                    let tempLeft = centerPieces.white.children.left;
                    let tempBack = centerPieces.white.children.back;
                    let tempRight = centerPieces.white.children.right;

                    centerPieces.white.children.left = centerPieces.white.children.front;
                    centerPieces.white.children.front = tempRight;
                    centerPieces.white.children.right = tempBack;
                    centerPieces.white.children.back = tempLeft;
                }
            }

            requestAnimationFrame(() => {
                topPrimeRotation(this.centerPieces, this.context, (() => {

                    let finalTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), cameraTransformation));
                    this.context.setTransformation(finalTransformation);
                    DrawMainCube(this.context);

                    let adjustedOrigin = [origin[0], origin[1], origin[2] + 40];
                    DrawYellowLayer(this.centerPieces, this.context, adjustedOrigin, scale, cameraTransformation);
                }));
            });
            break;
        case 'bottom':
            i = 1;
            let bottomRotation = function(centerPieces, context, callback) {
                context.clearRect(-canvasWidth / 2, -canvasHeight / 2, canvas.width, canvas.height);
                let rotation = m4.rotateY(cameraTransformation, DegreesToRadians(i * 2)); 
                DrawYellowLayer(centerPieces, context, [origin[0], origin[1], origin[2] + 40], scale, rotation);
                callback();
                i++
                if(i <= 45) {
                    requestAnimationFrame(() => {bottomRotation(centerPieces, context, callback)});
                }
                else {
                    let tempLeft = centerPieces.white.children.left;
                    let tempFront = centerPieces.white.children.front;
                    let tempRight = centerPieces.white.children.right;

                    centerPieces.yellow.children.left = centerPieces.yellow.children.back;
                    centerPieces.yellow.children.front = tempLeft;
                    centerPieces.yellow.children.right = tempFront;
                    centerPieces.yellow.children.back = tempRight;
                }
            }

            requestAnimationFrame(() => {
                bottomRotation(this.centerPieces, this.context, (() => {

                    let finalTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), cameraTransformation));
                    this.context.setTransformation(finalTransformation);
                    DrawMainCube(this.context);

                    let adjustedOrigin = [origin[0], origin[1], origin[2] + 40];
                    DrawWhiteLayer(this.centerPieces, this.context, adjustedOrigin, scale, cameraTransformation);
                }));
            });          
            break;
        case 'bottom prime':
            i = 1;
            let bottomPrimeRotation = function(centerPieces, context, callback) {
                context.clearRect(-canvasWidth / 2, -canvasHeight / 2, canvas.width, canvas.height);
                let rotation = m4.rotateY(cameraTransformation, DegreesToRadians((-i * 2))); 
                DrawYellowLayer(centerPieces, context, [origin[0], origin[1], origin[2] + 40], scale, rotation);
                callback();
                i++
                if(i <= 45) {
                    requestAnimationFrame(() => {bottomPrimeRotation(centerPieces, context, callback)});
                }
                else {
                    let tempLeft = centerPieces.white.children.left;
                    let tempBack = centerPieces.white.children.back;
                    let tempRight = centerPieces.white.children.right;

                    centerPieces.yellow.children.left = centerPieces.yellow.children.front;
                    centerPieces.yellow.children.front = tempRight;
                    centerPieces.yellow.children.right = tempBack;
                    centerPieces.yellow.children.back = tempLeft;
                }
            }

            requestAnimationFrame(() => {
                bottomPrimeRotation(this.centerPieces, this.context, (() => {

                    let finalTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), cameraTransformation));
                    this.context.setTransformation(finalTransformation);
                    DrawMainCube(this.context);

                    let adjustedOrigin = [origin[0], origin[1], origin[2] + 40];
                    DrawWhiteLayer(this.centerPieces, this.context, adjustedOrigin, scale, cameraTransformation);
                }));
            });  
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
    DrawWhiteLayer(centerPieces, context, adjustedOrigin, scale, cameraTransformation);
    // DrawRedLayer(centerPieces, context, adjustedOrigin, scale, cameraTransformation);
    DrawYellowLayer(centerPieces, context, adjustedOrigin, scale, cameraTransformation);
    // DrawOrangeLayer(centerPieces, context, adjustedOrigin, scale, cameraTransformation);
    // DrawGreenLayer(centerPieces, context, adjustedOrigin, scale, cameraTransformation);
    // DrawBlueLayer(centerPieces, context, adjustedOrigin, scale, cameraTransformation);
}

function DrawWhiteLayer(centerPieces, context, origin, scale, cameraTransformation) {
    let whiteTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateZ(m4.rotateX(cameraTransformation, DegreesToRadians(270)), DegreesToRadians(90))));
    centerPieces.white.Draw(whiteTransformation);
}

function DrawRedLayer(centerPieces, context, origin, scale, cameraTransformation) {
    let redTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateZ(m4.rotateY(cameraTransformation, DegreesToRadians(180)), DegreesToRadians(270))));
    centerPieces.red.Draw(redTransformation);
}

function DrawYellowLayer(centerPieces, context, origin, scale, cameraTransformation) {
    let yellowTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateZ(m4.rotateX(cameraTransformation, DegreesToRadians(90)), DegreesToRadians(90))));
    centerPieces.yellow.Draw(yellowTransformation);
}

function DrawOrangeLayer(centerPieces, context, origin, scale, cameraTransformation) {
    let orangeTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateZ(m4.rotateY(cameraTransformation, DegreesToRadians(0)), DegreesToRadians(90))));
    centerPieces.orange.Draw(orangeTransformation);
}

function DrawGreenLayer(centerPieces, context, origin, scale, cameraTransformation) {
    let greenTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateY(cameraTransformation, DegreesToRadians(90))));
    centerPieces.green.Draw(greenTransformation);
}

function DrawBlueLayer(centerPieces, context, origin, scale, cameraTransformation) {
    let blueTransformation = m4.multiply(m4.translation(origin), m4.multiply(m4.scaling([scale, scale, scale]), m4.rotateY(m4.rotateX(cameraTransformation, DegreesToRadians(180)), DegreesToRadians(270))));
    centerPieces.blue.Draw(blueTransformation);
}

function DegreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}