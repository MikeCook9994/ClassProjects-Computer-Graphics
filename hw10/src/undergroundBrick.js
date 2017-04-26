function UndergroundBrick(objectAttributes, vertexShader, fragmentShader, textureImageSources) {
    let attributes = CreateBrickAttributes(objectAttributes);
    let uniformTemplate = CreateBrickUniformTemplate();

    this.entityCollection = new EntityCollection(objectAttributes, vertexShader, fragmentShader, attributes, uniformTemplate);

    let entityCount = 24;
    for(let entityId = 0; entityId < entityCount; entityId++) {
        this.entityCollection.CreateEntity(entityId);
    }

    this.textureSamplerNumbers = this.entityCollection.SetupTextures(textureImageSources);        
}

UndergroundBrick.prototype.Draw = function(cameraMatrix, projectionMatrix) {

    let entityId = 0;
    for(let height = -13; height < -12; height++) {
        for(let depth = 1; depth < 6; depth++) {
            for(let width = -1; width < 2; width++) {
                let modelTransform = m4.multiply(m4.translation([2.2 * (depth), 2.2 * (height), 2.2 * (width)]), m4.scaling([10, 10, 10]));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], this.textureSamplerNumbers[1], GetSunDirection()]);
                entityId++;
            }
        }
    }

    for(let height = -12; height < -11; height++) {
        for(let depth = 2; depth < 5; depth++) {
            for(let width = -1; width < 2; width++) {
                let modelTransform = m4.multiply(m4.translation([2.2 * (depth), 2.2 * (height), 2.2 * (width)]), m4.scaling([10, 10, 10]));
                let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
                let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));
                this.entityCollection.UpdateUniformValues(entityId, [normalMatrix, modelViewMatrix, projectionMatrix, this.textureSamplerNumbers[0], this.textureSamplerNumbers[1], GetSunDirection()]);
                entityId++;
            }
        }
    }

    this.entityCollection.Draw();
}