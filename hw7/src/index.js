let m4 = twgl.m4;

(() => {
    let glHost = new GLHost(document.getElementById("drawing-plane").getContext("webgl"));

    let angleSlider = document.getElementById("slider1");
    let cameraHeightSlider = document.getElementById("slider2");
    let fovSlider = document.getElementById("slider3");
    let cameraTargetSlider = document.getElementById("slider4");    

    let wireframeCheckbox = document.getElementById("checkbox1");

    function Draw() {
        let cameraTransform = GetCameraTransform();
        let projectionTransform = m4.perspective(DegreesToRadians(fovSlider.value), 1, 10, 1000);
        CopyValuesForScene(cameraTransform, projectionTransform);

        SetupCanvas();
        scene.Draw();

        window.requestAnimationFrame(Draw);
    }

    function GetCameraTransform() {
        let angle1 = slider1.value*0.01*Math.PI;
        let eye = [300*Math.sin(angle1), slider2.value, 300*Math.cos(angle1)];
        let target = [0,cameraTargetSlider.value,0];
        let up = [0,1,0];
        return m4.inverse(m4.lookAt(eye,target,up));
    }

    function SetupCanvas() {
        glHost.ConfigureWebGL();
        glHost.ColorCanvas(1.0, 1.0, 1.0, 1.0);
    }

    function CopyValuesForScene(cameraTransform, projectionTransform) {
        let modelTransform1 = m4.scaling([10, 10, 10]);
        entity1.EnableProgram();
        entity1.SetUniformValues(cameraTransform, projectionTransform, modelTransform1, wireframeCheckbox.checked, new Float32Array([0.54, 0.27, 0.07]));

        let modelTransform2 = m4.multiply(m4.translation([2.25, 0.0, 0.0]), m4.scaling([10, 10, 10]));
        entity2.EnableProgram();
        entity2.SetUniformValues(cameraTransform, projectionTransform, modelTransform2, wireframeCheckbox.checked, new Float32Array([0.54, 0.27, 0.07]));
    }

    let scene = new Scene();

    let entity1 = new Entity(glHost, groundBlockObjectAttributes);
    entity1.SetupProgram(shadingVertexShader, shadingFragmentShader);
    scene.AddEntity(entity1);

    let entity2 = new Entity(glHost, groundBlockObjectAttributes);
    entity2.SetupProgram(shadingVertexShader, shadingFragmentShader);
    scene.AddEntity(entity2);

    window.requestAnimationFrame(Draw);
})();

