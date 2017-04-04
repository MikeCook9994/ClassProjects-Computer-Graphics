function Entity(glHost, model) {
    this.glHost = glHost;
    this.modelAttributes = model;
}

Entity.prototype.SetupProgram = function(vertexShaderSource, fragmentShaderSource) {
    let vertexShader = this.glHost.CreateAndCompileShader(this.glHost.gl.VERTEX_SHADER, vertexShaderSource);
    let fragmentShader = this.glHost.CreateAndCompileShader(this.glHost.gl.FRAGMENT_SHADER, fragmentShaderSource);
    this.shaderProgram = this.glHost.CreateAndConfigureProgram(vertexShader, fragmentShader);

    this.uniformNames = ["modelViewMatrix", "normalMatrix", "projectionMatrix", "wireframe", "color"];
    this.uniformLocations = this.glHost.GetUniformLocations(this.shaderProgram, this.uniformNames);

    this.attributeNames = ["position", "normal", "barycentric"];
    this.attributeLocations = this.glHost.GetAttributeLocations(this.shaderProgram, this.attributeNames);

    let attributeData = [
        new Float32Array(this.modelAttributes.vertices), 
        new Float32Array(this.modelAttributes.vertexNormals), 
        defineBaryCentricCoordiantes(this.modelAttributes.vertices.length)
    ];
    this.attributeBuffers = this.glHost.BufferAttributeData(this.attributeNames, attributeData);
}

Entity.prototype.EnableProgram = function() {
    this.glHost.SetShaderProgram(this.shaderProgram);
}

Entity.prototype.SetUniformValues = function(cameraMatrix, projectionMatrix, modelMatrix, isWireframe, color) {
    let modelViewMatrix = m4.multiply(modelMatrix, cameraMatrix);
    let normalMatrix = m4.transpose(m4.inverse(modelViewMatrix));

    this.glHost.gl.uniformMatrix4fv(this.uniformLocations["modelViewMatrix"], false, modelViewMatrix);
    this.glHost.gl.uniformMatrix4fv(this.uniformLocations["normalMatrix"], false, normalMatrix);
    this.glHost.gl.uniformMatrix4fv(this.uniformLocations["projectionMatrix"], false, projectionMatrix);
    this.glHost.gl.uniform3fv(this.uniformLocations["color"], color);
    if(isWireframe) {
        this.glHost.gl.uniform1f(this.uniformLocations["wireframe"], 1.0);
    }
    else {
        this.glHost.gl.uniform1f(this.uniformLocations["wireframe"], 0.0);
    }


    this.glHost.SpecifyAttributes(this.attributeNames, this.attributeBuffers, this.attributeLocations);
}

Entity.prototype.Draw = function() {
    this.EnableProgram();
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

function DegreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}