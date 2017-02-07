let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let threeDimContext = new ThreeDimContext(context);
    centerCanvas(context);

    let cameraAngle = document.getElementById("camera-angle");
    let blockScale = document.getElementById("block-scale");

    let rubiksCube = new RubiksCube(threeDimContext);
    let cameraTransformation = GetCameraTransformation(cameraAngle.value);
    let scale = blockScale.value;
    rubiksCube.Draw(cameraTransformation, [-5, -5, -5], scale);

    let buttons = document.getElementsByClassName("rotate-button");
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

            cameraTransformation = GetCameraTransformation(cameraAngle.value);
            scale = blockScale.value;
            rubiksCube.Rotate(buttons[i].value, cameraTransformation, [-5, -5, -5], scale, canvas.width, canvas.height);
        });
    }

    let ranges = document.getElementsByClassName("range-slider");
    for(let i = 0; i < ranges.length; i++) {
        ranges[i].addEventListener("input", () => {
            context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

            cameraTransformation = GetCameraTransformation(cameraAngle.value);
            scale = blockScale.value;
            rubiksCube.Draw(cameraTransformation, [-5, -5, -5], scale);
        });
    }
})();

function centerCanvas(context) {
    context.scale(1, -1);
    context.translate(canvas.width / 2,- canvas.height / 2);
}

function GetCameraTransformation(cameraAngle) {
        let target = [0, 0, 0];
        let up = [0, 1, 0];
        let angle = cameraAngle * 0.01 * Math.PI;

        let eye = [500 * Math.cos(angle), 300, 500 * Math.sin(angle)];

        return m4.inverse(m4.lookAt(eye,target,up))
}

