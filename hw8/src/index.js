(() => {
    function SetupCanvas() {
        glHost.ConfigureWebGL();
        glHost.ColorCanvas(1.0, 1.0, 1.0, 1.0);
    }    

    function GetCameraTransform() {
        let angle1 = angleSlider.value*0.01*Math.PI;
        let eye = [300*Math.sin(angle1), cameraYSlider.value, 300*Math.cos(angle1)];
        let target = [0, lookatYSlider.value, lookatZSlider.value];
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
    let cameraYSlider = document.getElementById("slider2");
    let lookatYSlider = document.getElementById("slider3");  
    let lookatZSlider = document.getElementById("slider4");
    let fovSlider = document.getElementById("slider5");
  
    let ground = new Ground(glHost, groundBlockObjectAttributes, shadingVertexShader, shadingFragmentShader);
    let pipe = new Pipe(glHost, pipeObjectAttributes, shadingVertexShader, shadingFragmentShader);
    let mario = new Mario(glHost, marioObjectAttributes, shadingVertexShader, shadingFragmentShader);
    
    let scene = new Scene();
    scene.AddEntity(pipe);
    scene.AddEntity(mario);
    scene.AddEntityCollection(ground);

    window.requestAnimationFrame(Draw);
})();