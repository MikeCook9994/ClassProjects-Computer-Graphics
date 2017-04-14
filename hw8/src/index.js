(() => {
    function SetupCanvas() {
        glHost.ConfigureWebGL();
        glHost.ColorCanvas(0.365, 0.58, 0.984, 1.0);
    }    

    function GetCameraTransform() {
        let angle1 = angleSlider.value*0.01*Math.PI;
        let eye = [300*Math.sin(angle1), cameraYSlider.value, 300*Math.cos(angle1)];
        let target = [lookatXSlider.value, lookatYSlider.value, 0];
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
    let lookatXSlider = document.getElementById("slider2");
    let lookatYSlider = document.getElementById("slider3");  
    let cameraYSlider = document.getElementById("slider4");
    let fovSlider = document.getElementById("slider5");

    let marioTextureImageSource = "http://i.imgur.com/KxFBFbe.png?1";
    let groundBlockTextureImageSource = "http://i.imgur.com/53tE88X.png";
    let undergroundBlockTextureImageSource = "http://i.imgur.com/w34IpSn.png";
    let brickTextureImageSource = "http://i.imgur.com/VuAeSyH.png";
    let undergroundBrickTextureImageSource = "http://i.imgur.com/5meN48n.png";
    let coinTextureImageSource = "http://i.imgur.com/xWPJ1tJ.png";

    let scene = new Scene();

    scene.AddEntity(new Mario(marioObjectAttributes, texturingVertexShader, texturingFragmentShader, [marioTextureImageSource]));
    scene.AddEntity(new UndergroundBackground(planeObjectAttributes, shadingVertexShader, shadingFragmentShader));
    scene.AddEntityCollection(new Ground(groundBlockObjectAttributes, texturingVertexShader, texturingFragmentShader, [groundBlockTextureImageSource]));
    scene.AddEntityCollection(new Underground(groundBlockObjectAttributes, texturingVertexShader, texturingFragmentShader, [undergroundBlockTextureImageSource]));
    // scene.AddEntityCollection(new UndergroundBrick(brickBlockObjectAttributes, texturingVertexShader, texturingFragmentShader, [undergroundBrickTextureImageSource]));
    scene.AddEntityCollection(new Brick(brickObjectAttributes, texturingVertexShader, texturingFragmentShader, [brickTextureImageSource]));
    // scene.AddEntityCollection(new Coin(coinObjectAttributes, texturingVertexShader, texturingFragmentShader, [coinTextureImageSource]));
    scene.AddEntityCollection(new Pipe(pipeObjectAttributes, shadingVertexShader, shadingFragmentShader));

    window.requestAnimationFrame(Draw);
})();