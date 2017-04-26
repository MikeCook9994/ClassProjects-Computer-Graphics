function Camera() {
    this.position = [0, cameraYSlider.value, 0];
    this.lookAt = [0, 0, 0];
    this.angles = [0, 0, 0];
    
    this.keysdown = {};
    document.body.onkeydown = ((e) => {
        let event = window.event ? window.event : e;
        this.keysdown[event.keyCode] = true;
        e.stopPropagation();
    });

    document.body.onkeyup = ((e) => {
        let event = window.event ? window.event : e;
        delete this.keysdown[event.keyCode];
        e.stopPropagation();
    });    
}

Camera.prototype.GetCameraTransform = function() {
    if (this.keysdown[65]) { 
        console.log("move/camera left");
        this.angles[1] += .02; 
    }
    else if (this.keysdown[68]) {
        console.log("move/camera right"); 
        this.angles[0] -= .02;
        this.angles[2] -= .02; 
    }

    if (this.keysdown[82]) { 
        console.log("move/camera up");
        this.angles[1] += .02; 
    }
    if (this.keysdown[70]) { 
        console.log("move/camera down");
        this.angles[1] -= .02;
    }

    let dx = Math.sin(this.angles[0]);
    let dy = Math.sin(this.angles[1]);
    let dz = Math.cos(this.angles[2]);

    if (this.keysdown[87]) {
        consle.log("move forward");
        this.position[0] -= .25 * dx;
        this.position[1] += .25 * dy;
        this.position[2] -= .25 * dz;
    }

    if (this.keysdown[83]) {
        console.log("move backward");
        this.position[0] += .25 * dx;
        this.position[1] -= .25 * dy;
        this.position[2] += .25 * dz;
    }
    
    let angle1 = angleSlider.value*0.01*Math.PI;
    let eye = [300*Math.sin(angle1), cameraYSlider.value, 300*Math.cos(angle1)];
    let target = [lookatXSlider.value, lookatYSlider.value, 0];
    let up = [0,1,0];
    
    let cameraMatrix = m4.multiply(m4.rotationX(this.angles[0]), m4.lookAt(eye,target,up));
    m4.multiply(cameraMatrix, twgl.m4.rotationY(this.angles[1]), cameraMatrix);
    m4.setTranslation(cameraMatrix, this.position, cameraMatrix);
    
    return twgl.m4.inverse(cameraMatrix);
}

Camera.prototype.GetProjectionTransform = function() {
    return m4.perspective(DegreesToRadians(fovSlider.value), 1, 10, 100000);
}