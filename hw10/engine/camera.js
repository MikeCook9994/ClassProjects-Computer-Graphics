function Camera(canvasId) {

    this.target = [-8, 164, 0];

    this.fieldOfView = 72;

    this.angle = -99;
    this.eyeY = 144;
    this.eye = [300 * Math.sin(this.angle * 0.01 * Math.PI), this.eyeY, 300 * Math.cos(this.angle * 0.01 * Math.PI)];
    
    let canvas = document.getElementById(canvasId);

    this.keysdown = {};
    canvas.addEventListener("keydown", ((e) => {
        this.keysdown[event.keyCode] = true;
        e.stopPropagation();
    }), false);

    canvas.addEventListener("keyup", ((e) => {
        delete this.keysdown[event.keyCode];
        e.stopPropagation();
    }), false);

    canvas.addEventListener("mousewheel", ((e) => {
        if(e.wheelDelta < 0) {
            this.fieldOfView += 1;
            this.calculateEye();
        }
        else if(e.wheelDelta >= 0) {
            this.fieldOfView -= 2;
            this.calculateEye();
        }
        return  false;
    }), false);

    canvas.addEventListener("mousedown", ((e) => {
        canvas.addEventListener("mousemove", UpdateViewAngle, false);
    }), false);

    canvas.addEventListener("mouseup", ((e) => {
        canvas.removeEventListener("mousemove", UpdateViewAngle, false);
        this.lastLocation = [];
    }), false);

    canvas.addEventListener("mouseleave", ((e) => {
        canvas.removeEventListener("mousemove", UpdateViewAngle, false);
        this.lastLocation = [];
    }), false);


    let UpdateViewAngle = ((e) => {
        if(this.hasOwnProperty("lastLocation") == false) {
            this.lastLocation = [e.screenX, e.screenY];
            return;
        }
        
        if(this.lastLocation[1] > e.screenY) {
            this.eyeY -= 2;
        }
        else {
            this.eyeY += 2;
        }

        this.lastLocation = [e.screenX, e.screenY];
        this.calculateEye();
    });

    this.calculateEye = ((e) => {
        this.eye = [300 * Math.sin(this.angle * 0.01 * Math.PI), this.eyeY, 300 * Math.cos(this.angle * 0.01 * Math.PI)];
    });
}

Camera.prototype.GetCameraTransform = function() {
    if (this.keysdown[65]) { 
        this.target[0] += 2;
        this.calculateEye();
    }
    else if (this.keysdown[68]) { 
        this.target[0] -= 2;
        this.calculateEye();
    }

    if(this.keysdown[87]) {
        this.target[1] += 2;
        this.eyeY += 2;
        this.calculateEye();
    }
    else if(this.keysdown[83]) {
        this.target[1] -= 2;
        this.eyeY -= 2;
        this.calculateEye();
    }

    if(this.keysdown[81]) {
        this.angle -= .5;
        this.calculateEye();
    }
    else if(this.keysdown[69]) {
        this.angle += .5;
        this.calculateEye();
    }

    return m4.inverse(m4.lookAt(this.eye, this.target, [0, 1, 0]));
}

Camera.prototype.GetProjectionTransform = function() {
    return m4.perspective(DegreesToRadians(this.fieldOfView), 1, 10, 100000);
}

Camera.prototype.ResetView = function() {
    this.target = [-8, 164, 0];

    this.fieldOfView = 72;

    this.angle = -99;
    this.eyeY = 144;
    this.calculateEye();
}