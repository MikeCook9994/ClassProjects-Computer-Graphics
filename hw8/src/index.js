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

    let angleSlider = document.getElementById("slider1");
    let cameraYSlider = document.getElementById("slider2");
    let lookatYSlider = document.getElementById("slider3");  
    let lookatZSlider = document.getElementById("slider4");
    let fovSlider = document.getElementById("slider5");

    let marioTextureImageSource = "http://i.imgur.com/lvaEw2u.png";
    let cubeTextureImageSource = "http://i.imgur.com/8rE2XyE.png";
    let colorGradientTextureImageSource = "http://i.imgur.com/L8Ig9V6.jpg?2";

    let pipe = new Pipe(pipeObjectAttributes, shadingVertexShader, shadingFragmentShader);
    let ground = new Ground(groundBlockObjectAttributes, shadingVertexShader, shadingFragmentShader);
    //let mario = new Mario(marioObjectAttributes, texturingVertexShader, texturingFragmentShader, colorGradientTextureImageSource);
    let mario = new Mario(marioObjectAttributes, texturingVertexShader, texturingFragmentShader, marioTextureImageSource);
    
    let scene = new Scene();

    scene.AddEntityCollection(ground);
    scene.AddEntity(pipe);
    scene.AddEntity(mario);

    window.requestAnimationFrame(Draw);
})();