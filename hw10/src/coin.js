function Coin(objectAttributes, vertexShader, fragmentShader, textureImageSources) {
    let attributes = CreateCoinAttributes(objectAttributes);
    let uniformTemplate = CreateCoinUniformTemplate();

    this.angle = 0;
    this.entityCollection = new EntityCollection(objectAttributes, vertexShader, fragmentShader, attributes, uniformTemplate);

    let entityCount = 9;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }

    this.textureSamplerNumbers = this.entityCollection.SetupTextures(textureImageSources);        
}

Coin.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let entityId = 0;
    for(let height = -11; height < -10; height++) {
        for(let depth = 2; depth < 5; depth++) {
            for(let width = -1; width < 2; width++) {
                let modelTransform = m4.multiply(m4.rotationY(DegreesToRadians(this.angle)), m4.multiply(m4.translation([2.2 * (depth), 2.2 * (height) + .5, 2.2 * (width)]), m4.scaling([10, 10, 10])));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], GetSunDirection()]);
                entityId++;
            }
        }
    }
    this.entityCollection.Draw();
    this.angle+=2;
}

function CreateCoinUniformTemplate() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "textureSampler", "light"];
    let uniformMatrixSpecifier = [true, true, true, false, false];
    let uniformCopyFunctions = [webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform3fv")];
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreateCoinAttributes(objectAttributes) {
    let attributeNames = ["position", "normal", "textureCoordinates"];
    let attributeValues = [
        new Float32Array(objectAttributes.vertices), 
        new Float32Array(objectAttributes.vertexNormals),
        new Float32Array(objectAttributes.vertexTextureCoordinates)
    ];
    let attributeSizes = [3, 3, 2];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}