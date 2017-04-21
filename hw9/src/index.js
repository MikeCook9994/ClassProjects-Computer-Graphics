(() => {
    function SetupCanvas() {
        webglApp.ConfigureWebGL();
        webglApp.ColorCanvas(0.365, 0.58, 0.984, 1.0);
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
        let projectionTransform = m4.perspective(DegreesToRadians(fovSlider.value), 1, 10, 100000);

        scene.Draw(cameraTransform, projectionTransform);
            window.requestAnimationFrame(Draw);
    }

    let scene = new Scene();

    scene.AddEntity(new Mario(marioObjectAttributes, texturingVertexShader, texturingFragmentShader, [marioTextureImageSource]));
    scene.AddEntity(new UndergroundBackground(planeObjectAttributes, shadingVertexShader, shadingFragmentShader));
    scene.AddEntityCollection(new Ground(groundBlockObjectAttributes, texturingVertexShader, texturingFragmentShader, [groundBlockTextureImageSource]));
    scene.AddEntityCollection(new Underground(groundBlockObjectAttributes, texturingVertexShader, texturingFragmentShader, [undergroundBlockTextureImageSource]));
    scene.AddEntityCollection(new UndergroundBrick(brickObjectAttributes, texturingVertexShader, texturingFragmentShader, [undergroundBrickTextureImageSource]));
    scene.AddEntityCollection(new Brick(brickObjectAttributes, bumpMapTextureVertexShader, bumpMapTextureFragmentShader, [brickTextureImageSource, brickBumpMap]));
    scene.AddEntityCollection(new Coin(coinObjectAttributes, texturingVertexShader, texturingFragmentShader, [coinTextureImageSource]));
    scene.AddEntityCollection(new Pipe(pipeObjectAttributes, shadingVertexShader, shadingFragmentShader));
    scene.AddEntity(new Skybox(cubeObjectAttributes, skyboxVertexShader, skyboxFragmentShader, skyboxImageSource));

    window.requestAnimationFrame(Draw);
})();