let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("drawing-plane");
    let glHost = new GLHost(canvas.getContext("webgl"));

    let angleSlider = document.getElementById("slider1");
    let cameraHeightSlider = document.getElementById("slider2");
    let fovSlider = document.getElementById("slider3");
    let wireframeCheckbox = document.getElementById("checkbox1");

    // change what is assigned to these variables to change the model and the shader;

    let pipeModel = new Pipe(glHost);
    pipeModel.SetupProgram();
    
    function draw() {
        let cameraTransform = GetCameraTransform();
        let projectionTransform = m4.perspective(DegreesToRadians(fovSlider.value), 1, 10, 1000);

        SetupCanvas();

        pipeModel.SetUniformValues(cameraTransform, projectionTransform, wireframeCheckbox.checked);
        pipeModel.Draw();
    }

    function GetCameraTransform() {
        let angle1 = slider1.value*0.01*Math.PI;
        let eye = [300*Math.sin(angle1),slider2.value, 300*Math.cos(angle1)];
        let target = [0,100,0];
        let up = [0,1,0];
        return m4.inverse(m4.lookAt(eye,target,up));
    }

    function DegreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function SetupCanvas() {
        glHost.gl.clearColor(0.0, 1.0, 1.0, 1.0);
        glHost.gl.enable(glHost.gl.DEPTH_TEST);
        glHost.gl.clear(glHost.gl.COLOR_BUFFER_BIT | glHost.gl.DEPTH_BUFFER_BIT);
    }

    angleSlider.addEventListener("input", draw);
    cameraHeightSlider.addEventListener("input", draw);
    fovSlider.addEventListener("input", draw);
    wireframeCheckbox.addEventListener("change", draw);
    draw();
})();