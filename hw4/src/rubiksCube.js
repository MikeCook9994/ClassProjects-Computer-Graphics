function RubiksCube(threeDimContext, blowoutSize) {
	this.context = threeDimContext;
	this.blowout = blowoutSize;
	this.cubePieces = {
		top: [[], [], []],
		middle: [[], [], []],
		bottom: [[], [], []]
	};
	InitializePieces(this.cubePieces, this.context);
}

RubiksCube.prototype.Draw = function(transformation) {
	this.cubePieces.middle[1][1].Draw(transformation);	
}

function InitializePieces(cubePieces, threeDimContext) {
	cubePieces.middle[1][1] = new CorePiece(threeDimContext);
}