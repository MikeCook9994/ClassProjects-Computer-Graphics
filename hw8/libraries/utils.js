let m4 = twgl.m4;

function DegreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function CreateUniforms(uniformNames, groundUniformMatrixBooleans, groundUniformCopyFunction, attributeNames) {
    let uniforms = {};
    uniformNames.forEach((uniformName, index) => {
        uniforms[uniformName] = new Uniform(uniformName, groundUniformMatrixBooleans[index], groundUniformCopyFunction[index]);
    });
    return uniforms;
}

function CreateAttributes(attributeNames, attributeValues) {
    let attributes = {};
    attributeNames.forEach((attributeName, index) => {
        attributes[attributeName] = new Attribute(attributeName, attributeValues[index]);
    });
    return attributes;
}

function CreateShaderProgram(glHost) {
    let vertexShader = glHost.CreateAndCompileShader(glHost.gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = glHost.CreateAndCompileShader(glHost.gl.FRAGMENT_SHADER, fragmentShaderSource);
    let shaderProgram = glHost.CreateAndConfigureProgram(vertexShader, fragmentShader);
    return shaderProgram;
}

function PrintSliderValues() {
    console.log("angle: " + document.getElementById("slider1").value);
    console.log("height: " + document.getElementById("slider2").value);
    console.log("target: " + document.getElementById("slider3").value);
    console.log("fov:" + document.getElementById("slider4").value);   
} 