let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let threeDimContext = new ThreeDimContext(context);

    let cameraAngle = document.getElementById("camera-angle");
    
    let target = [0,0,0];
    let up = [0,1,0];
    let axesOrigin = 256;

    let axes = new Axes(threeDimContext);
    let rubiksCube = new RubiksCube(threeDimContext, [axesOrigin, -axesOrigin, -200]);

    function update() {
        canvas.width = canvas.width;

        let angle = cameraAngle.value * 0.01 * Math.PI;
        let eye = [500 * Math.cos(angle), 300, 500 * Math.sin(angle)];
        
        let cameraTransformation = m4.inverse(m4.lookAt(eye,target,up))
        let finalTransformation = m4.multiply(cameraTransformation, m4.translation([axesOrigin, -axesOrigin, 0])); 

        axes.Draw(200, finalTransformation);
        rubiksCube.Draw(cameraTransformation);

        requestAnimationFrame(update);
    }
    update();
})();

