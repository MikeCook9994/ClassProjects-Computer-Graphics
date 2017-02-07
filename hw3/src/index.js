let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("canvas");
    let cameraAngle = document.getElementById("camera-angle");
    let blockScale = document.getElementById("block-scale");

    let context = canvas.getContext('2d');
    let threeDimContext = new ThreeDimContext(context);
    centerCanvas(context);

    let rubiksCube = new RubiksCube(threeDimContext);
    let axes = new Axes(threeDimContext);

    function update() {
        context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);

        let cameraTransformation = GetCameraTransformation(cameraAngle.value);
        let scale = blockScale.value;

        axes.Draw(200, cameraTransformation);
        rubiksCube.Draw(cameraTransformation, [-5, -5, -5], scale);

        requestAnimationFrame(update);
    }
    update();
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

