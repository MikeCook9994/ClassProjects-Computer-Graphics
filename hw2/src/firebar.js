function Firebar(context) {
    this.colorPalette = {
        orangeBrown: "rgb(116, 116, 116)",
        gray: "rgb(200, 76, 12)"
    }
    this.angle = 0;

    this.context = context;

    this.fireballs = [];
    for(let i = 0; i < 7; i++) {
        this.fireballs[i] = new Fireball(this.context);
    }
}

Firebar.prototype.Draw = function(x, fireRotationDelta, fireScale) {
    this.context.save();
    this.context.translate(x, 320);
    this.context.scale(4, 4);

    DrawBlock(this.context, this.colorPalette);
    this.angle = DrawFireballBar(this.context,this.fireballs, fireScale, this.angle);
    this.context.restore();
}

function DrawBlock(context, colorPalette) {
    context.fillStyle = colorPalette.gray;
    context.fillRect(1, 1, 14, 14);

    context.fillStyle = colorPalette.orangeBrown;
    context.fillRect(0, 1, 1, 14);
    context.fillRect(1, 0, 14, 1);
    context.fillRect(1, 15, 14, 1);
    context.fillRect(15, 1, 1, 14);
    context.fillRect(2, 2, 1, 1);
    context.fillRect(13, 2, 1, 1);
    context.fillRect(2, 13, 1, 1);
    context.fillRect(13, 13, 1, 1);
}

function DrawFireballBar(context, fireballs, fireScale, currAngle) {
    context.save();
    context.translate(8, 8);

    let angle = currAngle - (2 * (Math.PI / 180));
    context.rotate(angle);
    fireballs[0].Draw(5, fireScale);

    for(let i = 1; i < 7; i++) {
        context.save();
        context.translate(0, -fireScale * 8);
        fireballs[0].Draw(1, fireScale);
    }

    for(let i = 0; i < 7; i++) {
        context.restore();
    }
    
    return angle;
}