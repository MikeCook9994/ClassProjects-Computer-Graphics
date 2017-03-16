function Model(glHost, selectedModel) {
    this.glHost = glHost;
    this.modelAttributes = eval(selectedModel);
}

Model.prototype.SetupProgram = function() {
    let vertexShader = this.glHost.CreateAndCompileShader(this.glHost.gl.VERTEX_SHADER, shadingVertexShader);
    if(vertexShader == null) {
        return null;
    } 
    
    let fragmentShader = this.glHost.CreateAndCompileShader(this.glHost.gl.FRAGMENT_SHADER, shadingFragmentShader);
    if(fragmentShader == null) {
        return null;
    } 

    let shaderProgram = this.glHost.CreateAndConfigureProgram(vertexShader, fragmentShader);
    if(shaderProgram == null) {
        return null;
    }

    this.uniformNames = ["modelViewMatrix", "normalMatrix", "projectionMatrix", "time", "wireframe"];
    this.uniformLocations = this.glHost.GetUniformLocations(shaderProgram, this.uniformNames);

    this.attributeNames = ["position", "normal", "barycentric"];
    this.attributeLocations = this.glHost.GetAttributeLocations(shaderProgram, this.attributeNames);

    let attributeData = [
        new Float32Array(this.modelAttributes.vertices), 
        new Float32Array(this.modelAttributes.vertexNormals), 
        defineBaryCentricCoordiantes(this.modelAttributes.vertices.length)
    ];
    this.attributeBuffers = this.glHost.BufferAttributeData(this.attributeNames, attributeData);
}

Model.prototype.SetUniformValues = function(cameraMatrix, projectionMatrix, isWireframe) {
    let modelTransform = m4.scaling([70, 70, 70]);
    let modelViewMatrix = m4.multiply(modelTransform, cameraMatrix);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.glHost.gl.uniformMatrix4fv(this.uniformLocations["modelViewMatrix"], false, modelViewMatrix);
    this.glHost.gl.uniformMatrix4fv(this.uniformLocations["normalMatrix"], false, normalMatrix);
    this.glHost.gl.uniformMatrix4fv(this.uniformLocations["projectionMatrix"], false, projectionMatrix);
    this.glHost.gl.uniform1f(this.uniformLocations["time"], + new Date());
    if(isWireframe) {
        this.glHost.gl.uniform1f(this.uniformLocations["wireframe"], 1.0);
    }
    else {
        this.glHost.gl.uniform1f(this.uniformLocations["wireframe"], 0.0);
    }

    this.glHost.SpecifyAttributes(this.attributeNames, this.attributeBuffers, this.attributeLocations);
}

Model.prototype.Draw = function() {
    this.glHost.gl.drawArrays(this.glHost.gl.TRIANGLES, 0, this.modelAttributes.vertices.length / 3);
}

function defineBaryCentricCoordiantes(length) {
    let barycentricCoords = [];
    for(let i = 0; i < length / 3; i++) {
        // these ternary operators determine which vertex should have value one. These rest will be zero.
        barycentricCoords.push(((i % 3 == 0) ? (1.0) : (0.0)));
        barycentricCoords.push(((i % 3 == 1) ? (1.0) : (0.0)));
        barycentricCoords.push(((i % 3 == 2) ? (1.0) : (0.0)));
    }
    return new Float32Array(barycentricCoords);
}