let m4 = twgl.m4;
let webglApp = new WebGLApp("drawing-plane");

let timeOfDaySlider = document.getElementById("time-of-day");
let angleSlider = document.getElementById("camera-angle");
let lookatXSlider = document.getElementById("lookat-x");
let lookatYSlider = document.getElementById("lookat-y");  
let cameraYSlider = document.getElementById("camera-y");
let fovSlider = document.getElementById("fov");

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
    let vertexShader = webglApp.CreateAndCompileShader(webglApp.GetGLProperty("VERTEX_SHADER"), vertexShaderSource);
    let fragmentShader = webglApp.CreateAndCompileShader(webglApp.GetGLProperty("FRAGMENT_SHADER"), fragmentShaderSource);
    return webglApp.CreateAndConfigureProgram(vertexShader, fragmentShader);
}

function PrintSliderValues() {
    console.log("time of day: " + timeOfDaySlider.value);
    console.log("angle: " + angleSlider.value);
    console.log("lookat x: " + lookatXSlider.value);  
    console.log("lookat y: " + lookatYSlider.value);
    console.log("cam y: " + cameraYSlider.value);
    console.log("fov: " + fovSlider.value);    
} 

function GetSunDirection() {
    let timeOfDay = Number(timeOfDaySlider.value);
    let lightAngle = Math.PI * (timeOfDay-6)/12;
    return lightVector = [Math.cos(lightAngle), Math.sin(lightAngle), 0];
}