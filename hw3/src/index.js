let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let threeDimContext = new ThreeDimContext(context);

    let cameraAngle = document.getElementById("camera-angle");

    function update() {
        canvas.width = canvas.width;

        let angle = cameraAngle.value * 0.01 * Math.PI;
        let eye = [500 * Math.cos(angle), 300, 500 * Math.sin(angle)];
        let target = [0,0,0];
        let up = [0,1,0];
        
        let cameraTransformation = m4.inverse(m4.lookAt(eye,target,up))
        let finalTransformation = m4.multiply(cameraTransformation, m4.translation([256, -256, 0])); 

        let axes = new Axes(threeDimContext);
        axes.Draw(200, finalTransformation);
        requestAnimationFrame(update);
    }
    update();
})();

