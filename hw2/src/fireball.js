function Fireball(context) {
    this.context = context
    
    this.angle = 0;
    this.colorPalette = {
        orangeRed: "rgb(216, 40, 0)",
        orangeYellow: "rgb(252, 152, 56)",
        white: "rgb(252, 252, 252)"
    }
}

Fireball.prototype.Draw = function(dtheta, scale){
    this.angle += dtheta;
    this.context.save();
    this.context.rotate(this.angle * Math.PI/180);
    this.context.translate(-(scale * 4), -(scale * 4));
    this.context.scale(scale, scale);
    DrawFireball(this.context, this.colorPalette);
    this.context.restore();
}

function DrawFireball(context, colorPalette) {
    context.fillStyle = colorPalette.orangeRed;
    DrawLargestFireballPiece(context);

    context.fillStyle = colorPalette.orangeYellow;
    DrawMediumFireballPiece(context);

    context.fillStyle = colorPalette.white;
    DrawFireballAccents(context);
}

function DrawLargestFireballPiece(context) {
    context.beginPath();
    context.moveTo(0, 6);
    context.lineTo(0, 2);
    context.lineTo(1, 2);
    context.lineTo(1, 1);
    context.lineTo(2, 1);
    context.lineTo(2, 0);
    context.lineTo(6, 0);
    context.lineTo(6, 1);
    context.lineTo(7, 1);
    context.lineTo(7, 4);
    context.lineTo(6, 4);
    context.lineTo(6, 5);
    context.lineTo(4, 5);
    context.lineTo(4, 7);
    context.lineTo(5, 7);
    context.lineTo(5, 8);
    context.lineTo(3, 8);
    context.lineTo(3, 7);
    context.lineTo(1, 7);
    context.lineTo(1, 6);
    context.lineTo(0, 6);
    context.fill();
    context.closePath();

    context.fillRect(5, 6, 1, 1);
    context.fillRect(6, 7, 1, 1);
    context.fillRect(7, 5, 1, 1);
}

function DrawMediumFireballPiece(context) {
    context.beginPath();
    context.moveTo(1, 5);
    context.lineTo(1, 3);
    context.lineTo(2, 3);
    context.lineTo(2, 2);
    context.lineTo(3, 2);
    context.lineTo(3, 1);
    context.lineTo(5, 1);
    context.lineTo(5, 2);
    context.lineTo(6, 2);
    context.lineTo(6, 3);
    context.lineTo(5, 3);
    context.lineTo(5, 4);
    context.lineTo(3, 4);
    context.lineTo(3, 6);
    context.lineTo(2, 6);
    context.lineTo(2, 5);
    context.closePath();
    context.fill();
}

function DrawFireballAccents(context) {
    context.fillRect(2, 3, 1, 1);
    context.fillRect(3, 2, 1, 1);
}