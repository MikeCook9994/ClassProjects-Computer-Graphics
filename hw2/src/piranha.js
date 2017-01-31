function Piranha(context) {
    this.context = context;

    this.goingUp = true;
    this.currentLocation = 0;
    this.frameCount = 0;
    this.waitFrames = 0;
    this.leafAngle = 30;
    this.colorPalette = {
        orange: "rgb(200, 76, 12)",
        blue: "rgb(0, 128, 136)",
        lightPink: "rgb(252, 188, 176)"
    }
}

Piranha.prototype.Draw = function(x, height, scale) {
    UpdateState();

    this.context.save();
    this.context.scale(scale, scale);

    DrawLeaves(this.context, this.colorPalette);
    DrawLeftPlant(this.context, this.colorPalette);
    DrawRightPlant(this.context, this.colorPalette);

    this.context.restore();
}

function UpdateState() {
    if(this.frameCount == 6) {
        this.frameCount = 0;
        if(this.currentLocation == 21 && this.waitFrames == 30) {
            this.goingUp = false;
            this.currentLocation--;
            this.waitFrames = 0;
        }
        else if(this.currentLocation == 0 && this.waitFrames == 30) {
            this.goingUp = true;
            this.currentLocation++;
            this.waitFrames = 0;
        }
        else if((this.currentLocation == 21 || this.currentLocation == 0) && this.WaitFrames != 30) {
            this.waitFrames++;
        }
        else if(this.goingUp == true) {
            this.currentLocation++;

        }
        else {
            this.currentLocation--;
        }
    }
    else {
        this.frameCount++;
    }
}

function DrawLeaves(context, colorPalette) {

}

function DrawLeftPlant(context, colorPalette) {

}

function DrawRightPlant(context, colorPalette) {

}