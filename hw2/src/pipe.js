function Pipe(context, canvasHeight) {
    this.canvasHeight = canvasHeight;
    this.context = context
    this.piranha = new Piranha(context);

    this.colorPalette = {
        white: "rgb(255, 255, 255)",
        lightGray: "rgb(173, 173, 173)",
        darkGray: "rgb(99, 99, 99)"
    }
}

Pipe.prototype.Draw = function(x, height, scale) {
    this.piranha.Draw(x, height + 15, scale);
    DrawPipeTop(this.context, this.colorPalette, x, height, this.canvasHeight, scale);
    DrawPipeBottom(this.context, this.colorPalette, x, height, this.canvasHeight, scale);
}

function DrawPipeTop(context, colorPalette, x, pipeHeight, canvasHeight, scale) {
    context.save();
    context.translate(x, canvasHeight - ((pipeHeight + 16) * scale));
    context.scale(scale, scale);

    context.fillStyle = colorPalette.white;
    context.fillRect(0, 0, 32, 15);

    context.fillStyle = colorPalette.darkGray;
    context.fillRect(0, 0, 1, 15);
    context.fillRect(0, 0, 32, 1);
    context.fillRect(0, 14, 32, 1);
    context.fillRect(31, 0, 1, 15);

    context.fillStyle = colorPalette.lightGray;
    context.fillRect(1, 2, 5, 1);
    context.fillRect(4, 2, 2, 12);
    context.fillRect(12, 2, 1, 12);
    context.fillRect(13, 2, 18, 1);
    context.fillRect(15, 2, 10, 12);
    
    for(let i = 3; i < 14; i+=2) {
        context.fillRect(26, i, 1, 1);
        context.fillRect(28, i, 1, 1);
        context.fillRect(25, i - 1, 1, 1);
        context.fillRect(27, i - 1, 1, 1);
    }

    context.restore();
}

function DrawPipeBottom(context, colorPalette, x, pipeHeight, canvasHeight, scale) {
    for(let i = 2; i <= pipeHeight; i+=2) {
        context.save();
        context.translate(x, canvasHeight - (scale * i));
        context.scale(scale, scale);

        DrawPipeBottomSegment(context, colorPalette);

        context.restore();
    }

    context.save();
    context.translate(x, canvasHeight - ((pipeHeight + 1) * scale));
    context.scale(scale, scale);
    context.fillStyle = colorPalette.darkGray;
    context.fillRect(2, 0, 28, 1);
    context.restore();
}

function DrawPipeBottomSegment(context, colorPalette) {
    context.fillStyle = colorPalette.white;
    context.fillRect(2, 0, 28, 2);

    context.fillStyle = colorPalette.darkGray;
    context.fillRect(2, 0, 1, 2);
    context.fillRect(29, 0, 1, 2);

    context.fillStyle = colorPalette.lightGray;
    context.fillRect(6, 0, 2, 2);
    context.fillRect(13, 0, 1, 2);
    context.fillRect(16, 0, 8, 2);

    context.fillRect(24, 1, 1, 1);
    context.fillRect(25, 0, 1, 1);
    context.fillRect(26, 1, 1, 1);
}