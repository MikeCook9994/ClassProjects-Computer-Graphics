let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let threeDimContext = new ThreeDimContext(context);
    centerCanvas(context);

    let cameraAngleSlider = document.getElementById("angle-slider");
    let wireFrameCheckbox = document.getElementById("wireframe-checkbox");
    let blowoutSlider = document.getElementById("blowout-slider");
    let handlers = [cameraAngleSlider, wireFrameCheckbox, blowoutSlider];

    let rubiksCube = new RubiksCube(threeDimContext, 10);

    let cameraTransformation = GetCameraTransformation(cameraAngleSlider.value, 500);

    rubiksCube.Draw(cameraTransformation, parseInt(blowoutSlider.value), wireFrameCheckbox.checked)
    
    handlers.forEach((handler) => {
        handler.addEventListener(((handler.type != "checkbox") ? "input" : "click"), () => {
            context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
            cameraTransformation = GetCameraTransformation(cameraAngleSlider.value, 500);
            rubiksCube.Draw(cameraTransformation, parseInt(blowoutSlider.value), wireFrameCheckbox.checked);
        });
    });
})();

function centerCanvas(context) {
    context.scale(1, -1);
    context.translate(canvas.width / 2, -canvas.height / 2);
}

function GetCameraTransformation(cameraAngle, cameraHeight) {
    let target = [0, 0, 0];
    let up = [0, 1, 0];
    let angle = cameraAngle * 0.01 * Math.PI;

    let eye = [cameraHeight * Math.cos(angle), 300, cameraHeight * Math.sin(angle)];

    let camera = m4.inverse(m4.lookAt(eye,target,up));

    // return m4.multiply(camera, m4.perspective(DegreesToRadians(1), 1, 2, 1));
    return camera;
}

function DegreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}