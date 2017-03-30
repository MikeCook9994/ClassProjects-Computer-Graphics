function GLHost(webGLContext) {
    this.gl = webGLContext;
}

GLHost.prototype.CreateAndCompileShader = function(shaderType, shaderSource) {
     let shader = this.gl.createShader(shaderType);
     this.gl.shaderSource(shader, shaderSource);
     this.gl.compileShader(shader);
     if(!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
         alert(this.gl.getShaderInfoLog(shader));
         return null;
     }
     return shader;
}

GLHost.prototype.CreateAndConfigureProgram = function(vertexShader, fragmentShader) {
    let shaderProgram = this.gl.createProgram();
    this.gl.attachShader(shaderProgram, vertexShader);
    this.gl.attachShader(shaderProgram, fragmentShader);
    this.gl.linkProgram(shaderProgram);
    this.gl.useProgram(shaderProgram);
    if(!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
        alert("Shader linking failed");
        return null;
    }
    return shaderProgram;
}

GLHost.prototype.GetUniformLocations = function(shaderProgram, uniformNames) {
    let uniformLocations = {};
    uniformNames.forEach((uniformName) => {
        uniformLocations[uniformName] = this.gl.getUniformLocation(shaderProgram, uniformName);
    });
    return uniformLocations;
}

GLHost.prototype.GetAttributeLocations = function(shaderProgram, attributeNames) {
    let attributeLocations = {};
    attributeNames.forEach((attributeName) => {
        attributeLocations[attributeName] = this.gl.getAttribLocation(shaderProgram, attributeName);
        if(attributeLocations[attributeName] != -1) {
            this.gl.enableVertexAttribArray(attributeLocations[attributeName]);
        }
    });
    return attributeLocations;
}

GLHost.prototype.BufferAttributeData = function(attributeNames, attributeData) {
    let buffers = {};
    attributeNames.forEach((attributeName, index) => {
        let buff = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, attributeData[index], this.gl.STATIC_DRAW);
        buffers[attributeName] = buff;
    });
    return buffers;
}

GLHost.prototype.SpecifyAttributes = function(attributeNames, attributeBuffers, attributeLocations) {
    attributeNames.forEach((attributeName) => {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attributeBuffers[attributeName]);
        this.gl.vertexAttribPointer(attributeLocations[attributeName], 3, this.gl.FLOAT, false, 0, 0);
    });
}