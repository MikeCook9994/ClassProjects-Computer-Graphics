function Pipe(context) {
    this.context = context
    this.piranhaDrawer = new Piranha(context);

    this.colorPalette = {
        white: "rgb(255, 255, 255)",
        lightGray: "rgb(173, 173, 173)",
        darkGray: "rgb(99, 99, 99)"
    }
}

Pipe.prototype.Draw = function(x, height) {
    this.piranhaDrawer.Draw(x, height);
    DrawPipeTop(x, height);
    DrawPipeBottom(x, height);
}

function DrawPipeTop(x, height) {

}

function DrawPipeBottom(x, height) {
    for(let i = 0; i < (height / 2); i++) {
        DrawPipeBottomSegment(x);
    }
}

function DrawPipeBottomSegment(x) {

}