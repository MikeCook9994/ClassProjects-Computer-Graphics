function Coin(objectAttributes, vertexShader, fragmentShader, textureImageSources) {
    let attributes = CreateCoinAttributes(objectAttributes);
    let uniformTemplate = CreateCoinUniformTemplate();

    this.angle = 0;
    this.entityCollection = new EntityCollection(objectAttributes, vertexShader, fragmentShader, attributes, uniformTemplate);

    let entityCount = 9;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }   
}

Coin.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let entityId = 0;
    for(let height = -12; height < -11; height++) {
        for(let depth = 2; depth < 5; depth++) {
            for(let width = -1; width < 2; width++) {
                let modelTransform = m4.multiply(m4.rotationY(DegreesToRadians(this.angle)), m4.multiply(m4.translation([2.025 * (depth) + .5, 2.00 * (height), 2.025 * (width) + .55]), m4.scaling([10, 10, 10])));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, new Float32Array([.973, .314, .040]), GetSunDirection()]);
                entityId++;
            }
        }
    }
    this.entityCollection.Draw();
    this.angle+=2;
}

function CreateCoinUniformTemplate() {
    let uniformNames = ["normalMatrix", "modelViewMatrix", "projectionMatrix", "color", "light"];
    let uniformMatrixSpecifier = [true, true, true, false, false];
<<<<<<< Updated upstream
    let uniformCopyFunctions = [webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniformMatrix4fv"), webglApp.GetGLProperty("uniform1i"), webglApp.GetGLProperty("uniform3fv")];
=======
    let uniformCopyFunctions = [glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniformMatrix4fv, glHost.gl.uniform3fv, glHost.gl.uniform3fv];
>>>>>>> Stashed changes
    return CreateUniforms(uniformNames, uniformMatrixSpecifier, uniformCopyFunctions);
}

function CreateCoinAttributes(objectAttributes) {
    let attributeNames = ["position", "normal"];
    let attributeValues = [
        new Float32Array(objectAttributes.vertices), 
        new Float32Array(objectAttributes.vertexNormals)
    ];
    let attributeSizes = [3, 3];
    return CreateAttributes(attributeNames, attributeValues, attributeSizes);
}