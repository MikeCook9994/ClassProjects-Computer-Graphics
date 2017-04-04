let m4 = twgl.m4;

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

    function SetupAttributesAndUniforms(uniformNames, groundUniformCopyFunction, attributeNames) {
        let shaderValues = {
            uniforms: [],
            attributes: []
        }

        uniformNames.forEach((uniformName, index) => {
            shaderValues.uniforms.push(new Uniform(uniformName, groundUniformCopyFunction[index]));
        });

        attributeNames.forEach((attributeName) => {
            shaderValues.attributes.push(new Uniform(attributeName));
        });
    }

    function Draw() {
        SetupCanvas();

        let cameraTransform = GetCameraTransform();
        let projectionTransform = m4.perspective(DegreesToRadians(fovSlider.value), 1, 10, 1000);

        scene.CopyUniformValues(cameraTransform, projectionTransform);
        scene.Draw();
        window.requestAnimationFrame(Draw);
    }

    let glHost = new GLHost(document.getElementById("drawing-plane").getContext("webgl"));
    let angleSlider = document.getElementById("slider1");
    let cameraHeightSlider = document.getElementById("slider2");
    let fovSlider = document.getElementById("slider3");
    let cameraTargetSlider = document.getElementById("slider4");    
    let wireframeCheckbox = document.getElementById("checkbox1");

    let groundUniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "color"];    
    let groundUniformCopyFunction = [glHost.gl.uniformMatrix4v, glHost.gl.uniformMatrix4v, glHost.gl.uniformMatrix4v, glHost.gl.uniform3fv];

    let groundAttributeNames = ["position", "normal"];
    let groundData = SetupAttributesAndUniforms(groundUniformNames, groundUniformCopyFunctions, groundAttributeNames);
    let groundEntityCollection = new EntityCollection(glHost, groundBlockObjectAttributes, shadingVertexShader, shadingFragmentShader, groundData.uniforms, groundData.attributes);
    let ground = new Ground(groundEntityCollection);

    let scene = new Scene();
    scene.AddEntityCollection(ground);

    window.requestAnimationFrame(Draw);
})();

// let attributeData = [
//     new Float32Array(this.modelAttributes.vertices), 
//     new Float32Array(this.modelAttributes.vertexNormals), 
// ];