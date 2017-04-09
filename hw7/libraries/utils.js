let m4 = twgl.m4;

function DegreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function SetupAttributesAndUniforms(uniformNames, groundUniformMatrixBooleans, groundUniformCopyFunction, attributeNames) {
    let shaderValues = {
        "uniforms": {},
        "attributes": {}
    }

    uniformNames.forEach((uniformName, index) => {
        shaderValues.uniforms[uniformName] = new Uniform(uniformName, groundUniformMatrixBooleans[index], groundUniformCopyFunction[index]);
    });

    attributeNames.forEach((attributeName) => {
        shaderValues.attributes[attributeName] = new Attribute(attributeName);
    });
    
    return shaderValues;
}