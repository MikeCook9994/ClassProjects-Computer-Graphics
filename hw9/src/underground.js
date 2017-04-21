function Underground(objectAttributes, vertexShader, fragmentShader, textureImageSources) {
    let attributes = CreateGroundAttributes(objectAttributes);
    let uniformTemplate = CreateGroundUniformTemplate();

    this.entityCollection = new EntityCollection(objectAttributes, vertexShader, fragmentShader, attributes, uniformTemplate);

    let entityCount = 270;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }

    this.textureSamplerNumbers = this.entityCollection.SetupTextures(textureImageSources);        
}

Underground.prototype.Draw = function(cameraMatrix, projectionMatrix) {
    let entityId = 0;
    for(let height = -3; height < -1; height++) {
        for(let depth = -7; depth < 8; depth++) {
            for(let width = -1; width < 2; width++) {
                let modelTransform = m4.multiply(m4.translation([2.2 * (depth), 2.2 * (height) , 2.2 * (width)]), m4.multiply(m4.rotationY(DegreesToRadians(180)), m4.scaling([10, 10, 10])));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], GetSunDirection()]);
                entityId++;
            }
        }
    }

    for(let height = -15; height < -13; height++) {
        for(let depth = -7; depth < 8; depth++) {
            for(let width = -1; width < 2; width++) {
                let modelTransform = m4.multiply(m4.translation([2.2 * (depth), 2.2 * (height) , 2.2 * (width)]), m4.multiply(m4.rotationY(DegreesToRadians(180)), m4.scaling([10, 10, 10])));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], GetSunDirection()]);
                entityId++;
            }
        }
    }

    for(let height = -13; height < -3; height++) {
        for(let depth = -7; depth < -6; depth++) {
            for(let width = -1; width < 2; width++) {
                let modelTransform = m4.multiply(m4.translation([2.2 * (depth), 2.2 * (height) , 2.2 * (width)]), m4.multiply(m4.rotationY(DegreesToRadians(180)), m4.scaling([10, 10, 10])));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], GetSunDirection()]);
                entityId++;
            }
        }
    }

    for(let height = -13; height < -3; height++) {
        for(let depth = 6; depth < 8; depth++) {
            for(let width = -1; width < 2; width++) {
                let modelTransform = m4.multiply(m4.translation([2.2 * (depth), 2.2 * (height) , 2.2 * (width)]), m4.multiply(m4.rotationY(DegreesToRadians(180)), m4.scaling([10, 10, 10])));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], GetSunDirection()]);
                entityId++;
            }
        }
    }
    
    this.entityCollection.Draw();
}