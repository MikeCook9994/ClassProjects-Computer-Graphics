function GLHost(webGLContext) {
    this.gl = webGLContext;
}

GLHost.prototype.CreateAndCompileShader = function(shaderType, shaderSource) {
     let shader = this.gl.createShader(shaderType);
     this.gl.shaderSource(shader, shaderSource);
     this.gl.compileShader(shader);
     if(!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
         alert(gl.getShaderInfoLog(vertexShader));
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
        uniformLocations.uniformName = this.gl.getUniformLocation(shaderProgram, uniformName);
    });
    return uniformLocations;
}

GLHost.prototype.GetAttributeLocations = function(shaderProgram, attributeNames) {
    let attributeLocations = {};
    attributeNames.forEach((attributeName) => {
        attributeLocations.attributeName = this.gl.getAttribLocation(shaderProgram, attributeName);
        this.gl.enableVertexAttribArray(attributeLocations.attributeName);
    });
    return attributeLocations;
}

GLHost.prototype.BindAndBufferData = function(bufferType, data) {
    let buff = this.gl.createBuffer();
    this.gl.bindBuffer(bufferType, buff);
    this.gl.bufferData(bufferType, data, this.gl.STATIC_DRAW);
}