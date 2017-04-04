let m4 = twgl.m4;

(() => {
    let glHost = new GLHost(document.getElementById("drawing-plane").getContext("webgl"));

    let angleSlider = document.getElementById("slider1");
    let cameraHeightSlider = document.getElementById("slider2");
    let fovSlider = document.getElementById("slider3");
    let cameraTargetSlider = document.getElementById("slider4");    

    let wireframeCheckbox = document.getElementById("checkbox1");

    let scene = new Scene();

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
        
    }

    function CreateNewEntity(objectAttributes, vertexShader, fragmentShader) {
        let entity = new Entity(glHost, objectAttributes);
        entity.SetupProgram(vertexShader, fragmentShader);
        scene.AddEntity(entity);
    }

    for(let i = 0; i < 30; i++) {
        CreateNewEntity(groundBlockObjectAttributes, shadingVertexShader, shadingFragmentShader);
    }

    window.requestAnimationFrame(Draw);
})();

