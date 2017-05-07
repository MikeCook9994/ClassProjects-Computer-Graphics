let m4 = twgl.m4;
let v3 = twgl.v3;

let webglApp = new WebGLApp("drawing-plane");
let camera = new Camera("drawing-plane");

let timeOfDaySlider = document.getElementById("time-of-day");
document.getElementById("reset-view").onclick = (() => { camera.ResetView() });

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

function ComputeTangentBasis(objectAttributes) {
    objectAttributes.vertexTangents = [];
    objectAttributes.vertexBitangents = [];

    for(let i = 0; i < objectAttributes.vertices.length / 3; i+=3) {
        let vertex0 = [objectAttributes.vertices[(i * 3)], objectAttributes.vertices[(i * 3) + 1], objectAttributes.vertices[(i * 3) + 2]];
        let vertex1 = [objectAttributes.vertices[(i * 3) + 3], objectAttributes.vertices[(i * 3) + 4], objectAttributes.vertices[(i * 3) + 5]];
        let vertex2 = [objectAttributes.vertices[(i * 3) + 6], objectAttributes.vertices[(i * 3) + 7], objectAttributes.vertices[(i * 3) + 8]];  

        let uv0 = [objectAttributes.vertexTextureCoordinates[(i * 2)], objectAttributes.vertexTextureCoordinates[(i * 2) + 1]];
        let uv1 = [objectAttributes.vertexTextureCoordinates[(i * 2) + 2], objectAttributes.vertexTextureCoordinates[(i * 2) + 3]];
        let uv2 = [objectAttributes.vertexTextureCoordinates[(i * 2) + 4], objectAttributes.vertexTextureCoordinates[(i * 2) + 5]];

        let deltaPos1 = [vertex1[0] - vertex0[0], vertex1[1] - vertex0[1], vertex1[2] - vertex0[2]]; 
        let deltaPos2 = [vertex2[0] - vertex0[0], vertex2[1] - vertex0[1], vertex2[2] - vertex0[2]];

        let deltaUV1 = [uv1[0] - uv0[0], uv1[1] - uv0[1]];
        let deltaUV2 = [uv2[0] - uv0[0], uv2[1] - uv0[1]];

        let r = 1.0 / ((deltaUV1[0] * deltaUV2[1]) - (deltaUV1[1] * deltaUV2[0]));

        let tangent = [
            ((deltaPos1[0] * deltaUV2[1] - deltaPos2[0] * deltaUV1[1])*r), 
            ((deltaPos1[1] * deltaUV2[1] - deltaPos2[1] * deltaUV1[1])*r), 
            ((deltaPos1[2] * deltaUV2[1] - deltaPos2[2] * deltaUV1[1])*r)
        ];

        let bitangent = [
            ((deltaPos2[0] * deltaUV1[0] - deltaPos1[0] * deltaUV2[0])*r), 
            ((deltaPos2[1] * deltaUV1[0] - deltaPos1[1] * deltaUV2[0])*r), 
            ((deltaPos2[2] * deltaUV1[0] - deltaPos1[2] * deltaUV2[0])*r)
        ];
        
        for(let j = 0; j < 3; j++) {
            objectAttributes.vertexTangents.push(tangent[0]);
            objectAttributes.vertexTangents.push(tangent[1]);
            objectAttributes.vertexTangents.push(tangent[2]);

            objectAttributes.vertexBitangents.push(bitangent[0]);
            objectAttributes.vertexBitangents.push(bitangent[1]);
            objectAttributes.vertexBitangents.push(bitangent[2]);
        }
    }
}

function dot(a, b) {
    let dp = 0;
    for(let i = 0; i < a.length; i++) {
        dp += (a[i] + b[i]);
    }
    return dp;
}

function transpose(m) {
    let tm = [];
    for(let i = 0; i < m[0].length; i++) {
        tm[i] = [];
        for(let j = 0; j < m.length; j++) {
            tm[i][j] = m[j][i];
        }
    }
    return tm;
}