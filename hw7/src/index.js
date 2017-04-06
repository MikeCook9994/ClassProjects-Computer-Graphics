(() => {
    function SetupCanvas() {
        glHost.ConfigureWebGL();
        glHost.ColorCanvas(1.0, 1.0, 1.0, 1.0);
    }    

    function GetCameraTransform() {
        let angle1 = slider1.value*0.01*Math.PI;
        let eye = [300*Math.sin(angle1), slider2.value, 300*Math.cos(angle1)];
        let target = [0,cameraTargetSlider.value,0];
        let up = [0,1,0];
        return m4.inverse(m4.lookAt(eye,target,up));
    }

    function Draw() {
        SetupCanvas();

        let cameraTransform = GetCameraTransform();
        let projectionTransform = m4.perspective(DegreesToRadians(fovSlider.value), 1, 10, 1000);

        scene.Draw(cameraTransform, projectionTransform);
        window.requestAnimationFrame(Draw);
    }

    let glHost = new GLHost(document.getElementById("drawing-plane").getContext("webgl"));
    let angleSlider = document.getElementById("slider1");
    let cameraHeightSlider = document.getElementById("slider2");
    let fovSlider = document.getElementById("slider3");
    let cameraTargetSlider = document.getElementById("slider4");    
    let wireframeCheckbox = document.getElementById("checkbox1");

    let ground = new Ground(glHost, groundBlockObjectAttributes, shadingVertexShader, shadingFragmentShader);
    let pipe = new Pipe(glHost, pipeObjectAttributes, shadingVertexShader, shadingFragmentShader);
    
    let scene = new Scene();
    scene.AddEntity(pipe);
    scene.AddEntityCollection(ground);

    window.requestAnimationFrame(Draw);
})();