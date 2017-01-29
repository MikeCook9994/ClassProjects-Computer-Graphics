function Scene(context, height, width) {
    this.colorPalette = {
        black: "rgb(0, 0, 0)",
        white: "rgb(255, 255, 255)",
        lightGray: "rgb(188, 188, 188)",
        darkGray: "rgb(127, 127, 127)"
    }

    this.context = context;
    this.height = height;
    this.width = width;
}

Scene.prototype.Draw = function() {
    DrawSky(this.context, this.width, this.height, this.colorPalette);
    DrawGround(this.context, this.width, this.height, this.colorPalette);
}

function DrawSky(context, width, height, colorPalette) {
    context.fillStyle = colorPalette.black;
    context.fillRect(0,0, width, height);
}

function DrawGround(context, width, height, colorPalette) {
    context.save();
    context.scale(4, 4);
    for(let i = 0; i < width; i+=16)  {
        for(let j = 2; j > 0; j--) {
            DrawCastleGroundBlock(context, i, ((height / 4) - (j * 16)), colorPalette);
        }
    }
    context.restore();
}

function DrawCastleGroundBlock(context, x, y, colorPalette) {
    context.save();
    context.translate(x, y);

    context.fillStyle = colorPalette.lightGray;
    context.fillRect(0, 0, 16, 16);

    context.fillStyle = colorPalette.black;
    context.fillRect(1, 0, 1, 7);
    context.fillRect(0, 15, 16, 1);
    context.fillRect(0, 7, 16, 1);
    context.fillRect(5, 8, 1, 8);
    context.fillRect(9, 0, 1, 7);
    context.fillRect(13, 8, 1, 7);

    context.fillStyle = colorPalette.white;
    context.fillRect(0, 8, 4, 1);
    context.fillRect(2, 0, 1, 7);
    context.fillRect(2, 0, 7, 1);
    context.fillRect(10, 0, 6, 1);
    context.fillRect(10, 0, 1, 6);
    context.fillRect(6, 8, 1, 6);
    context.fillRect(6, 8, 6, 1);
    context.fillRect(14, 8, 1, 6);
    context.fillRect(14, 8, 2, 1);

    context.fillStyle = colorPalette.darkGray;
    context.fillRect(4, 8, 1, 7);
    context.fillRect(0, 14, 4, 1);
    context.fillRect(0, 0, 1, 7);
    context.fillRect(8, 0, 1, 7);
    context.fillRect(2, 6, 7, 1);
    context.fillRect(10, 6, 6, 1);
    context.fillRect(6, 14, 6, 1);
    context.fillRect(12, 8, 1, 7);
    context.fillRect(14, 14, 2, 1);

    context.restore();
}

// function DrawOverworldGroundBlock(context, x, y, colorPalette) {
//     context.save()
//     context.translate(x, y)

//     context.fillStyle = colorPalette.brown;
//     context.fillRect(0, 0, 16, 16);

//     context.fillStyle = colorPalette.lightBrown;
//     context.fillRect(1, 0, 9, 1);
//     context.fillRect(11, 0, 4, 1);
//     context.fillRect(0, 1, 1, 14);
//     context.fillRect(0, 11, 2, 1);
//     context.fillRect(2, 12, 2, 1);
//     context.fillRect(4, 13, 3, 1);
//     context.fillRect(10, 1, 1, 4);
//     context.fillRect(10, 6, 5, 1);
//     context.fillRect(10, 6, 1, 4);
//     context.fillRect(9, 10, 1, 2);
//     context.fillRect(8, 12, 1, 4);

//     context.fillStyle = colorPalette.black;
//     context.fillRect(15, 1, 1, 4);
//     context.fillRect(15, 6, 1, 9);
//     context.fillRect(1, 15, 6, 1);
//     context.fillRect(9, 15, 6, 1);
//     context.fillRect(9, 0, 1, 10);
//     context.fillRect(8, 10, 1, 2);
//     context.fillRect(7, 12, 1, 3);
//     context.fillRect(0, 10, 2, 1);
//     context.fillRect(2, 11, 2, 1);
//     context.fillRect(4, 12, 3, 1);
//     context.fillRect(11, 4, 1, 2);
//     context.fillRect(12, 5, 3, 1);
//     context.fillRect(14, 14, 1, 1);

//     context.restore();
// }
