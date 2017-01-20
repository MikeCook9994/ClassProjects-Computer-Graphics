function drawQuestionMarkBlock(coinBlockContext) {
    let colorPalette = {
        "dark orange": 'rgb(231, 89, 16)',
        "light orange": 'rgb(255, 164, 64)',
        "black": 'black'
    };

    // bottom and right border line
    coinBlockContext.fillStyle = colorPalette['black'];

    coinBlockContext.fillRect(0, 272, 256, 240);

    // center block
    coinBlockContext.fillStyle = colorPalette['light orange'];
    
    coinBlockContext.fillRect(16, 272, 224, 224);

    // top and left border line
    coinBlockContext.fillStyle = colorPalette['dark orange'];

    // top
    coinBlockContext.fillRect(16, 256, 224, 16);
    // left
    coinBlockContext.fillRect(0, 272, 16, 224);

    // bolts
    coinBlockContext.fillStyle = colorPalette['black'];

    // top left
    coinBlockContext.fillRect(32, 288, 16, 16);

    // top right
    coinBlockContext.fillRect(208, 288, 16, 16);

    // bottom right
    coinBlockContext.fillRect(32, 464, 16, 16);

    // bottom left
    coinBlockContext.fillRect(208, 464, 16, 16);

    // black question mark
    drawQuestionMark(coinBlockContext, 80, 336, colorPalette['black']);

    // orange question mark
    drawQuestionMark(coinBlockContext, 64, 320, colorPalette['dark orange']);

    /*
     * Draws a question market akin to one on the super mario bros coin block. 
     * 
     * context -> the canvas context to be used for drawing.
     * originX -> this point corresponds to x coordinate where the drawing will 
     * begin from. It begins from bottom left corner of the top part of the question mark.
     * originY -> this point corresponds to y coordinate where the drawing will 
     * begin from. It begins from bottom left corner of the top part of the question mark.
     * color -> the color of the question mark that will drawn.
     * 
     */
    function drawQuestionMark(context, originX, originY, color) {
        context.fillStyle = color;

        context.fillRect(originX, originY, 32, 48);
        context.fillRect(originX + 16, originY - 16, 80, 16);
        context.fillRect(originX + 80, originY, 32, 48);
        context.fillRect(originX + 64 , originY + 48, 48, 16);
        context.fillRect(originX + 48, originY + 64, 32, 32);
        context.fillRect(originX + 48, originY + 112, 32, 32);
    }
}

function drawCoin(coinContext, originY) {
    let colorPalette = {
        'black': 'black',
        'white': 'white',
        'yellow': 'rgb(248, 216, 30)',
        'bright yellow': 'rgb(248, 248, 0)',
        'mustard yellow': 'rgb(216, 158, 54)'
    };

    // black
    coinContext.fillStyle = colorPalette['black'];
    coinContext.fillRect(32, 64 + originY, 192, 128); 
    coinContext.fillRect(48, 32 + originY, 160, 192); 
    coinContext.fillRect(64, 16 + originY, 128, 224); 
    coinContext.fillRect(96, originY, 64, 256); 

    // white
    coinContext.fillStyle = colorPalette['white'];
    coinContext.fillRect(48, 64 + originY, 160, 128); 
    coinContext.fillRect(64, 32 + originY, 128, 192);
    coinContext.fillRect(96, 16 + originY, 64, 224);  

    // yellow
    coinContext.fillStyle = colorPalette['yellow'];
    coinContext.fillRect(64, 64 + originY, 144, 128);
    coinContext.fillRect(80, 48 + originY, 16, 16);
    coinContext.fillRect(96, 32 + originY, 96, 32);
    coinContext.fillRect(64, 192 + originY, 128, 32);

    // bright yellow
    coinContext.fillStyle = colorPalette['bright yellow'];
    coinContext.fillRect(80, 64 + originY, 96, 144);
    coinContext.fillRect(96, 48 + originY, 64, 16);
    coinContext.fillRect(112, 64 + originY, 16, 64);

    // mustard
    coinContext.fillStyle = colorPalette['mustard yellow'];
    coinContext.fillRect(96, 224 + originY, 64, 16);
    coinContext.fillRect(160, 208 + originY, 32, 16);
    coinContext.fillRect(176, 192 + originY, 16, 16);
    coinContext.fillRect(192, 64 + originY, 16, 128);
    coinContext.fillRect(176, 32 + originY, 16, 32);

    //details
    coinContext.fillStyle = colorPalette['black'];
    coinContext.fillRect(112, 192 + originY, 32, 16);
    coinContext.fillRect(144, 64 + originY, 16, 128);

    coinContext.fillStyle = colorPalette['white'];
    coinContext.fillRect(112, 48 + originY, 32, 16);
    coinContext.fillRect(96, 64 + originY, 16, 128);

    coinContext.fillStyle = colorPalette['yellow'];
    coinContext.fillRect(128, 64 + originY, 16, 128);
    coinContext.fillRect(112, 160 + originY, 16, 32);
}

(() => {
    let canvas = document.getElementById("coin-block");
    let context = canvas.getContext('2d');
    
    drawQuestionMarkBlock(context);

    canvas.addEventListener("click", (e) => {
        if(e.offsetY > 256) {
            let audio = new Audio("./sound/Mario-coin-sound.mp3");
            audio.play();

            i = 256;
            function drawFrame() {
                context.clearRect(0, 0, 256, 512);
                drawCoin(context, i);
                drawQuestionMarkBlock(context);
                i--;
                if(i >= 0) {
                    window.requestAnimationFrame(drawFrame);
                }
                else {
                    setTimeout(() => {
                        context.clearRect(0, 0, 256, 512);
                        drawQuestionMarkBlock(context);
                    }, 250);
                }
            }

            window.requestAnimationFrame(drawFrame);
        }
    });
})();