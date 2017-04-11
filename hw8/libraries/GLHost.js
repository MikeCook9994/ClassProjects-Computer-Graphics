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
    if(!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
        alert("Shader linking failed");
        return null;
    }
    return shaderProgram;
}

GLHost.prototype.SetShaderProgram = function(shaderProgram) {
    this.gl.useProgram(shaderProgram);
}

GLHost.prototype.GetUniformLocations = function(shaderProgram, uniforms) {
    Object.keys(uniforms).forEach((uniformName) => {
       uniforms[uniformName].location = this.gl.getUniformLocation(shaderProgram, uniformName);
    });
}

GLHost.prototype.GetAttributeLocations = function(shaderProgram, attributes) {
    let attributeLocations = {};
    Object.keys(attributes).forEach((attributeName) => {
        attributes[attributeName].location = this.gl.getAttribLocation(shaderProgram, attributeName);
    });
}

GLHost.prototype.BufferAttributeData = function(shaderProgram, attributes) {
    this.gl.useProgram(shaderProgram)
    Object.keys(attributes).forEach((attributeName, index) => {
        let buff = attributes[attributeName].buffer
        if(buff == null) {
            buff = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, attributes[attributeName].value, this.gl.STATIC_DRAW);
        attributes[attributeName].buffer = buff;
    });
}

GLHost.prototype.SpecifyAttributes = function(attributes) {
    Object.keys(attributes).forEach((attributeName) => {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attributes[attributeName].buffer);
        if(attributes[attributeName].location != -1) {
            this.gl.vertexAttribPointer(attributes[attributeName].location, attributes[attributeName].size, this.gl.FLOAT, false, 0, 0);
        }
    });
}

GLHost.prototype.EnableAttributes = function(attributes) {
    Object.keys(attributes).forEach((attributeName) => {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attributes[attributeName].buffer);
        if(attributes[attributeName].location != -1) {
            this.gl.enableVertexAttribArray(attributes[attributeName].location);
        }
    });
}

GLHost.prototype.SetupTexture = function(textureImageSource) {
    let texture = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);

    let textureImage = new Image();
    textureImage.onload = (() => {
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, textureImage);
        this.gl.generateMipmap(this.gl.TEXTURE_2D);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
    });
    textureImage.crossOrigin = "anonymous";
    textureImage.src = textureImageSource;

    return texture;
}

GLHost.prototype.ConfigureWebGL = function() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
}

GLHost.prototype.ColorCanvas = function(red, green, blue, alpha) {
    this.gl.clearColor(red, green, blue, alpha);
}