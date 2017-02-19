function RubiksCube(threeDimContext) {
	this.context = threeDimContext;
	this.cubePieces = {
		top: [[], [], []],
		middle: [[], [], []],
		bottom: [[], [], []]
	};
	InitializePieces(this.cubePieces, this.context);
}

RubiksCube.prototype.Draw = function(transformation, blowOutSize, drawWireFrameOnly) {
	let drawHeight = 10;
	
	// scales and centers the origin
	let centeringTransform = m4.multiply(m4.translation([-10, 0, 10]), m4.multiply(m4.scaling([100, 100, 100]), transformation));
	Object.keys(this.cubePieces).forEach((slice, sliceIndex) => {
		
		this.cubePieces[slice].forEach((row, rowIndex) => {			
			row.forEach((block, blockIndex) => {
				//positions each block of the cube within their row
				let blockTranslationTransform = 
					m4.multiply(m4.translation(
						[(blockIndex == 0 ? -blowOutSize : ((blockIndex == 1) ? 0 : blowOutSize) + 10 * blockIndex), 
							(drawHeight + (sliceIndex == 1 ? 0 : (sliceIndex == 0 ? blowOutSize : -blowOutSize))), 
							(rowIndex == 0 ? blowOutSize: ((rowIndex == 1 ? 0 : -blowOutSize) + (-10 * rowIndex)))
						]), centeringTransform);

				let rotations = handleOrientation(slice, rowIndex, blockIndex);

				let blockRotationTransform = m4.multiply(m4.rotationX(rotations.x), m4.multiply(m4.rotationY(rotations.y), m4.multiply(m4.rotationZ(rotations.z), blockTranslationTransform)));
				block.Draw(blockRotationTransform);
			});
		});
		drawHeight -= 10;
	});

	this.context.commitGeometry(drawWireFrameOnly);
}

function InitializePieces(cubePieces, threeDimContext) {
	cubePieces.top[0][0] = new CornerPiece(threeDimContext, "green", "white", "orange");
	cubePieces.top[0][1] = new EdgePiece(threeDimContext, "green", "white");
	cubePieces.top[0][2] = new CornerPiece(threeDimContext, "green", "red", "white");

	cubePieces.top[1][0] = new EdgePiece(threeDimContext, "orange", "white");
	cubePieces.top[1][1] = new CenterPiece(threeDimContext, "white");
	cubePieces.top[1][2] = new EdgePiece(threeDimContext, "red", "white");
	
	cubePieces.top[2][0] = new CornerPiece(threeDimContext, "white", "blue", "orange");
	cubePieces.top[2][1] = new EdgePiece(threeDimContext, "white", "blue");
	cubePieces.top[2][2] = new CornerPiece(threeDimContext, "white", "red", "blue");

	cubePieces.middle[0][0] = new EdgePiece(threeDimContext, "green", "orange");
	cubePieces.middle[0][1] = new CenterPiece(threeDimContext, "green");
	cubePieces.middle[0][2] = new EdgePiece(threeDimContext, "green", "red");

	cubePieces.middle[1][0] = new CenterPiece(threeDimContext, "orange");
	cubePieces.middle[1][1] = new CorePiece(threeDimContext);
	cubePieces.middle[1][2] = new CenterPiece(threeDimContext, "red");

	cubePieces.middle[2][0] = new EdgePiece(threeDimContext, "orange", "blue");
	cubePieces.middle[2][1] = new CenterPiece(threeDimContext, "blue");
	cubePieces.middle[2][2] = new EdgePiece(threeDimContext, "red", "blue");

	cubePieces.bottom[0][0] = new CornerPiece(threeDimContext, "yellow", "green", "orange");
	cubePieces.bottom[0][1] = new EdgePiece(threeDimContext, "yellow", "green");
	cubePieces.bottom[0][2] = new CornerPiece(threeDimContext, "yellow", "red", "green");

	cubePieces.bottom[1][0] = new EdgePiece(threeDimContext, "orange", "yellow");
	cubePieces.bottom[1][1] = new CenterPiece(threeDimContext, "yellow");
	cubePieces.bottom[1][2] = new EdgePiece(threeDimContext, "red", "yellow");

	cubePieces.bottom[2][0] = new CornerPiece(threeDimContext, "blue", "yellow", "orange");
	cubePieces.bottom[2][1] = new EdgePiece(threeDimContext, "blue", "yellow");
	cubePieces.bottom[2][2] = new CornerPiece(threeDimContext, "blue", "red", "yellow");
}

function handleOrientation(slice, rowIndex, blockIndex) {
	let zero = DegreesToRadians(0);
	let ninety = DegreesToRadians(90);
	let oneeighty = DegreesToRadians(180);
	let twoseventy = DegreesToRadians(270);

	let rotations = { 
		x : zero,
		y : zero, 
		z : zero 
	};

	if(slice == "top") {
		if(rowIndex == 0) {
			if(blockIndex == 2) {
				rotations.z = twoseventy;
			}
		}
		else if(rowIndex == 1) {
			if(blockIndex == 0) {
				rotations.y = twoseventy;
			}
			else if(blockIndex == 2){
				rotations.y = ninety;
			}
		}
		else if(rowIndex == 2){
			rotations.x = twoseventy;
			if(blockIndex == 2) {
				rotations.y = twoseventy;
			}
		}
	}
	else if(slice == "middle") {
		if(rowIndex == 0) {
			if(blockIndex == 0) {
				rotations.z = ninety;
			}
			else if(blockIndex == 1) {
				rotations.x = ninety;
			}
			else if(blockIndex == 2) {
				rotations.z = twoseventy;
			}
		}
		else if(rowIndex == 1) {
			if(blockIndex == 0) {
				rotations.z = ninety;
			}
			else if(blockIndex == 2){
				rotations.z = twoseventy;
			}
		}
		else if(rowIndex == 2){
			rotations.x = twoseventy;
			if(blockIndex == 0) {
				rotations.z = ninety;
			}
			else if(blockIndex == 2) {
				rotations.z = twoseventy;
			}
		}
	}
	else if(slice == "bottom") {
		if(rowIndex == 0) {
			rotations.x = ninety;
			if(blockIndex == 2) {
				rotations.y = ninety;
			}
		}
		else if(rowIndex == 1) {
			rotations.x = oneeighty;
			if(blockIndex == 0) {
				rotations.y = ninety;
			}
			else if(blockIndex ==2){
				rotations.y = twoseventy;
			}
		}
		else if(rowIndex ==2) {
			rotations.x = oneeighty;
			if(blockIndex == 2){
				rotations.z = ninety;
			}
		}
	}

	return rotations
}

function DegreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}