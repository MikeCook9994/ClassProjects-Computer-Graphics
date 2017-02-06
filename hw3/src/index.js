let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    
    context.scale(1, -1);
    context.translate(canvas.width / 2,- canvas.height / 2);

   
    let threeDimContext = new ThreeDimContext(context);

    let cameraAngle = document.getElementById("camera-angle");
    
    let target = [0, 0, 0];
    let up = [0, 1, 0];

    let axes = new Axes(threeDimContext);
    let rubiksCube = new RubiksCube(threeDimContext, [100, 100, 100]);

    function update() {
        context.clearRect(-canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        context.fillStyle="rgb(255,0,0)"

       
        let angle = cameraAngle.value * 0.01 * Math.PI;
        let eye = [500 * Math.cos(angle), 300, 500 * Math.sin(angle)];

        let cameraTransformation = m4.inverse(m4.lookAt(eye,target,up))

        axes.Draw(200, cameraTransformation);
        rubiksCube.Draw(cameraTransformation);

        requestAnimationFrame(update);
    }
    update();
})();

