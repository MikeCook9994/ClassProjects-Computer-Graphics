let m4 = twgl.m4;
let glHost = new GLHost(document.getElementById("drawing-plane").getContext("webgl"));

function DegreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function CreateUniforms(uniformNames, uniformTypes, uniformCopyFunctions) {
    let uniforms = {};
    uniformNames.forEach((uniformName, index) => {
        uniforms[uniformName] = new Uniform(uniformName, uniformTypes[index], uniformCopyFunctions[index]);
    });
    return uniforms;
}

function CreateAttributes(attributeNames, attributeValues, attributeSizes) {
    let attributes = {};
    attributeNames.forEach((attributeName, index) => {
        attributes[attributeName] = new Attribute(attributeName, attributeValues[index], attributeSizes[index]);
    });
    return attributes;
}

function CreateShaderProgram(vertexShaderSource, fragmentShaderSource) {
    let vertexShader = glHost.CreateAndCompileShader(glHost.gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = glHost.CreateAndCompileShader(glHost.gl.FRAGMENT_SHADER, fragmentShaderSource);
    return glHost.CreateAndConfigureProgram(vertexShader, fragmentShader);
}

function PrintSliderValues() {
    console.log("angle: " + document.getElementById("slider1").value);
    console.log("lookat x:" + document.getElementById("slider2").value);  
    console.log("lookat y: " + document.getElementById("slider3").value);
    console.log("cam y: " + document.getElementById("slider4").value);
    console.log("fov:" + document.getElementById("slider5").value);    
} 