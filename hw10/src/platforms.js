function Platforms(objectAttributes, vertexShader, fragmentShader, textureImageSources) {
    let attributes = CreatePlatformsAttributes(objectAttributes);
    let uniformTemplate = CreatePlatformsUniformTemplate();

    this.entityCollection = new EntityCollection(objectAttributes, vertexShader, fragmentShader, attributes, uniformTemplate);

    this.entityCount = 4;
    for(let entityId = 0; entityId < this.entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }

    this.textureSamplerNumbers = this.entityCollection.SetupTextures(textureImageSources);

    let controlPoints = [];
    controlPoints[0] = [[-98.5, -320, -22], [0, 1, 0], [-98.5, -100, -22], [0, 0, 1]];
    controlPoints[1] = [[-98.5, -100, -22], [0, 0, 1], [-98.5, -100, 22], [0, -1, 0]];
    controlPoints[2] = [[-98.5, -100, 22], [0, -1, 0], [-98.5, -320, 22], [0, 0, -1]];
    controlPoints[3] =[[-98.5, -320, 22], [0, 0, -1], [-98.5, -320, -22], [0, 1, 0]];
    this.curve = new Curve(hermiteBasisMatrix, controlPoints);
}

Platforms.prototype.Draw = function(cameraMatrix, projectionMatrix, frameCount) {
    let entityId = 0;
    let offset = 0;
    for(let i = 0; i < this.entityCount; i++) { 
        let t = (((frameCount % 101) * 0.04) + offset) % 4;

        let curvePosition = this.curve.GetTranslation(t);

        let modelTransform = m4.multiply(m4.scaling([7, 7, 7]), m4.multiply(m4.rotationY(DegreesToRadians(90)), curvePosition));
        let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);

        let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
        this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], this.textureSamplerNumbers[1], this.textureSamplerNumbers[2], GetSunDirection()]);
        entityId++;
        offset+=1
    } 
    this.entityCollection.Draw();
}

function CreatePlatformsUniformTemplate() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "textureSampler", "bumpMapSampler", "specularMapSampler", "light"];
    let uniformMatrixSpecifier = [true, true, true, false, false, false, false];
    let uniformCopyFunctions = [webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform3fv")];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreatePlatformsAttributes(objectAttributes) {
    ComputeTangentBasis(objectAttributes);
    let attributeNames = ["position", "normal", "tangent", "bitangent", "textureCoordinates"];
    let attributeValues = [
        new Float32Array(objectAttributes.vertices), 
        new Float32Array(objectAttributes.vertexNormals),
        new Float32Array(objectAttributes.vertexTangents),
        new Float32Array(objectAttributes.vertexBitangents),
        new Float32Array(objectAttributes.vertexTextureCoordinates)
    ];
    let attributeSizes = [3, 3, 3, 3, 2];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}

function DeterminePlatformSubCurve(t) {
    if(t >= 0.0 && t < 1.6672) {
        return 0;
    }
    else if(t >= 1.6672 && t < 1.997) {
        return 1;
    }
    else if(t >= 1.997 && t < 3.664) {
        return 2;
    }
    return 3;
}