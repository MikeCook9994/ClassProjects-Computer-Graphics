function Skybox(objectAttributes, vertexShaderSource, fragmentShaderSource, skyboxImageSource) {
    let attributes = CreateSkyboxAttributes(objectAttributes);
    let uniforms = CreateSkyboxUniforms();
    
    this.angle = 0;
    this.entity = new Entity(objectAttributes, uniforms, attributes, null, vertexShaderSource, fragmentShaderSource);
    this.entity.SetupSkybox(skyboxImageSource);
}

Skybox.prototype.Draw = function(cameraTransform, projectionMatrix) {
    let modelTransform = m4.multiply(m4.rotationY(DegreesToRadians(this.angle)), m4.scaling([1000, 1000, 1000]));
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
    this.angle+=0.05;

    this.entity.UpdateUniformValues([normalMatrix, modelViewMatrix, projectionMatrix, 0, GetSunDirection()]);
    this.entity.Draw();
}

function CreateSkyboxUniforms(shaderProgram) {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "textureSampler", "light"];
    let uniformMatrixSpecifier = [true, true, true, false, false]; 
    let uniformCopyFunctions = [webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform3fv")];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreateSkyboxAttributes(objectAttributes) {
    let attributeNames = ["position", "normal", "textureCoordinates"];
    let attributeValues = [
        new Float32Array(objectAttributes.vertices), 
        new Float32Array(objectAttributes.vertexNormals), 
        new Float32Array(objectAttributes.vertexTextureCoordinates)
    ];
    let attributeSizes = [3, 3, 2];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}