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
	let scaledTransform = m4.multiply(m4.scaling([10, 10, 10]), transformation);
	let drawHeight = 10;

	Object.keys(this.cubePieces).forEach((slice, sliceIndex) => {
		let sliceTransform = m4.multiply(m4.translation([-10, drawHeight + (sliceIndex == 1 ? 0 : (sliceIndex == 0 ? blowOutSize : -blowOutSize)), 10]), scaledTransform);
		
		this.cubePieces[slice].forEach((row, rowIndex) => {			
			let rowTransform = m4.multiply(m4.translation([0, 0, (rowIndex == 0 ? blowOutSize: ((rowIndex == 1 ? 0 : -blowOutSize) + (-10 * rowIndex)))]), sliceTransform);	
			
			row.forEach((block, blockIndex) => {
				let blockTransform = m4.multiply(m4.translation([(blockIndex == 0 ? -blowOutSize : ((blockIndex == 1) ? 0 : blowOutSize) + 10 * blockIndex), 0, 0]), rowTransform);
				block.Draw(blockTransform);
			});
		});
		drawHeight -= 10;
	});

	this.context.commitGeometry(drawWireFrameOnly);
}

function InitializePieces(cubePieces, threeDimContext) {
	Object.keys(cubePieces).forEach((slice => {
		cubePieces[slice].forEach((row) => {
			for(let i = 0; i < 3; i++) {
				row[i] = new CorePiece(threeDimContext, randomColor());
			}
		});
	}));
}

function randomColor() {
	return "rgb(" + (Math.floor(Math.random() * 255)) + ", " + (Math.floor(Math.random() * 255)) + ", " + (Math.floor(Math.random() * 255)) + ")";
}