function Scene(context, height, width) {
    this.colorPalette = {
        skyBlue: "rgb(98, 133, 251)",
        lightBrown: "rgb(250, 192, 149)",
        black: "rgb(0, 0, 0)",
        brown: "rgb(154, 72, 0)"
    }

    this.context = context;
    this.height = height;
    this.width = width;
}

Scene.prototype.Draw = function(scale) {
    DrawSky(this.context, this.width, this.height, this.colorPalette);
    DrawGround(this.context, this.width, this.height, scale, this.colorPalette);
}

function DrawSky(context, width, height, colorPalette) {
    context.fillStyle = colorPalette.skyBlue;
    context.fillRect(0,0, width, height);
}

function DrawGround(context, width, height, scale, colorPalette) {
    for(let i = 0; i < width; i+=(16*scale))  {
        for(let j = 2; j > 0; j--) {
            DrawGroundBlock(context, i, (height - (16 * j * scale)), scale, colorPalette);
        }
    }
}

function DrawGroundBlock(context, x, y, scale, colorPalette) {
    context.fillStyle = colorPalette.brown;
    context.lineWidth = scale;
    context.fillRect(x, y, 16 * scale, 16 * scale);

    context.fillStyle = colorPalette.lightBrown;
    context.fillRect(x + scale, y, 14 * scale, scale);
    context.fillRect(x, y + scale, scale, scale * 14);

    context.fillStyle = colorPalette.black;
    context.fillRect(x + scale, y + (scale * 15), 14 * scale, scale);
    context.fillRect(x + (scale * 15), y + scale, scale, 14 * scale);
}

