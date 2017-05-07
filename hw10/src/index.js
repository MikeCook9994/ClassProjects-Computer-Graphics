(() => {
    function SetupCanvas() {
        webglApp.ConfigureWebGL();
        webglApp.ColorCanvas(0.365, 0.58, 0.984, 1.0);
    }

    function Draw() {
        SetupCanvas();

        let cameraTransform = camera.GetCameraTransform();
        let projectionTransform = camera.GetProjectionTransform();

        scene.Draw(cameraTransform, projectionTransform);
        window.requestAnimationFrame(Draw);
    }

    let scene = new Scene();

    scene.AddEntity(new Mario(marioObjectAttributes, texturingVertexShader, texturingFragmentShader, [marioTextureImageSource]));
    scene.AddEntity(new UndergroundBackground(planeObjectAttributes, shadingVertexShader, shadingFragmentShader));
    scene.AddEntity(new Skybox(cubeObjectAttributes, skyboxVertexShader, skyboxFragmentShader, skyboxImageSource));

    scene.AddEntityCollection(new Pipe(pipeObjectAttributes, shadingVertexShader, shadingFragmentShader));
    scene.AddEntityCollection(new Coin(coinObjectAttributes, texturingVertexShader, texturingFragmentShader, [coinTextureImageSource]));
    scene.AddEntityCollection(new Ground(groundBlockObjectAttributes, bumpMapTextureVertexShader, bumpMapTextureFragmentShader, [groundBlockTextureImageSource, groundBumpMap, groundSpecularMap]));
    scene.AddEntityCollection(new Underground(groundBlockObjectAttributes, bumpMapTextureVertexShader, bumpMapTextureFragmentShader, [undergroundBlockTextureImageSource, groundBumpMap, groundSpecularMap]));
    scene.AddEntityCollection(new UndergroundBrick(brickObjectAttributes, bumpMapTextureVertexShader, bumpMapTextureFragmentShader, [undergroundBrickTextureImageSource, brickBumpMap, brickSpecularMap]));
    scene.AddEntityCollection(new Brick(brickObjectAttributes, bumpMapTextureVertexShader, bumpMapTextureFragmentShader, [brickTextureImageSource, brickBumpMap, brickSpecularMap]));

    window.requestAnimationFrame(Draw);
})();