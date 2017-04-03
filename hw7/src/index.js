let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("drawing-plane");
    let glHost = new GLHost(canvas.getContext("webgl"));

    let angleSlider = document.getElementById("slider1");
    let cameraHeightSlider = document.getElementById("slider2");
    let fovSlider = document.getElementById("slider3");
    let wireframeCheckbox = document.getElementById("checkbox1");
    let cameraTargetSlider = document.getElementById("slider4");
    let vertexShaderArea = document.getElementById("textarea1");
    vertexShaderArea.value = shadingVertexShader;
    let fragmentShaderArea = document.getElementById("textarea2");
    fragmentShaderArea.value = shadingFragmentShader;

    // change what is assigned to these variables to change the model and the shader;

    let model = new Model(glHost, groundBlockObjectAttributes);
    model.SetupProgram(shadingVertexShader, shadingFragmentShader);
    
    function Draw() {
        let cameraTransform = GetCameraTransform();
        let projectionTransform = m4.perspective(DegreesToRadians(fovSlider.value), 1, 10, 1000);

        SetupCanvas();

        model.SetUniformValues(cameraTransform, projectionTransform, wireframeCheckbox.checked);
        model.Draw();
    }

    function ReinitializeProgram() {
        model = new Model(glHost, modelDropdown.value);
        model.SetupProgram(vertexShaderArea.value, fragmentShaderArea.value);
        Draw();
    }

    function GetCameraTransform() {
        let angle1 = slider1.value*0.01*Math.PI;
        let eye = [300*Math.sin(angle1), slider2.value, 300*Math.cos(angle1)];
        let target = [0,cameraTargetSlider.value,0];
        let up = [0,1,0];
        return m4.inverse(m4.lookAt(eye,target,up));
    }

    function DegreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function SetupCanvas() {
        glHost.gl.clearColor(1.0, 1.0, 1.0, 1.0);
        glHost.gl.enable(glHost.gl.DEPTH_TEST);
        glHost.gl.clear(glHost.gl.COLOR_BUFFER_BIT | glHost.gl.DEPTH_BUFFER_BIT);
    }

    angleSlider.addEventListener("input", Draw);
    cameraHeightSlider.addEventListener("input", Draw);
    fovSlider.addEventListener("input", Draw);
    cameraTargetSlider.addEventListener("input", Draw);
    wireframeCheckbox.addEventListener("change", Draw);

    vertexShaderArea.addEventListener("input", ReinitializeProgram);
    fragmentShaderArea.addEventListener("input", ReinitializeProgram);

    Draw();
})();