function Mario(objectAttributes, vertexShaderSource, fragmentShaderSource, textureImageSources) {
    let attributes = CreateMarioAttributes(objectAttributes);
    let uniforms = CreateMarioUniforms();

    this.entity = new Entity(objectAttributes, uniforms, attributes, null, vertexShaderSource, fragmentShaderSource);
    this.textureSamplerNumbers = this.entity.SetupTextures(textureImageSources);

    let controlPoints = [];
    controlPoints[0] = [[89.0, 21.0, 0.0], [26.0, 21.0, 0], [-37.0, 21.0, 0.0], [-100.0, 21.0, 0.0]];
    controlPoints[1] = [[-100.0, 21.0, 0.0], [-180.0, 200.0, 0], [-180.0, 200.0, 0.0], [-260.0, 50, 0.0]];
    controlPoints[2] = [[-260.0, 50, 0.0], [-180.0, 200.0, 0.0], [-180.0, 200.0, 0], [-100.0, 21.0, 0.0]];
    controlPoints[3] = [[-100.0, 21.0, 0.0], [-37.0, 21.0, 0.0], [26.0, 21.0, 0], [89.0, 21.0, 0.0]];
    this.curve = new Curve(bezierBasisMatrix, controlPoints);
}

Mario.prototype.Draw = function(cameraTransform, projectionMatrix, frameCount) {
    let t = (frameCount % 101) * 0.04;
    let curvePosition = this.curve.GetTranslation(t);
    let curveOrientation = this.curve.GetRotation(t);

    let modelTransform = m4.multiply(m4.multiply(m4.rotationY(DegreesToRadians(90)), curveOrientation), m4.multiply(m4.scaling([2.5, 2.5, 2.5]), curvePosition));
    let modelViewMatrix = m4.multiply(modelTransform, cameraTransform);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.entity.UpdateUniformValues([normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], GetSunDirection()]);
    this.entity.Draw();
}

function CreateMarioUniforms(shaderProgram) {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "textureSampler", "light"];
    let uniformMatrixSpecifier = [true, true, true, false, false]; 
    let uniformCopyFunctions = [webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform3fv")];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreateMarioAttributes(objectAttributes) {
    let attributeNames = ["position", "normal", "textureCoordinates"];
    let attributeValues = [
        new Float32Array(objectAttributes.vertices), 
        new Float32Array(objectAttributes.vertexNormals), 
        new Float32Array(objectAttributes.vertexTextureCoordinates)
    ];
    let attributeSizes = [3, 3, 2];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}