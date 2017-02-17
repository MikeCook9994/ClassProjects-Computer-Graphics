let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let threeDimContext = new ThreeDimContext(context);
    centerCanvas(context);

    let cameraTransformation = GetCameraTransformation(40);

    let axes = new Axes(threeDimContext);
    axes.Draw(250, cameraTransformation);
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