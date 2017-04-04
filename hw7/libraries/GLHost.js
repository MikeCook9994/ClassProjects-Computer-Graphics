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
    uniforms.forEach((uniform) => {
       uniform.location = this.gl.getUniformLocation(shaderProgram, uniform.name);
    });
}

GLHost.prototype.GetAttributeLocations = function(shaderProgram, attributes) {
    let attributeLocations = {};
    attributes.forEach((attribute) => {
        attribute.location = this.gl.getAttribLocation(shaderProgram, attribute.name);
        if(attribute.locations != -1) {
            this.gl.enableVertexAttribArray(attribute.location);
        }
    });
}

GLHost.prototype.BufferAttributeData = function(attributes, shaderProgram) {
    this.gl.useProgram(shaderProgram)
    attributes.forEach((attribue, index) => {
        let buff = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buff);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, attribute.value, this.gl.STATIC_DRAW);
        attribute.buffer = buff;
    });
    return buffers;
}

GLHost.prototype.SpecifyAttributes = function(attributes) {
    attributes.forEach((attribute) => {
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attribute.name);
        this.gl.vertexAttribPointer(attribute.name, 3, this.gl.FLOAT, false, 0, 0);
    });
}

GLHost.prototype.ConfigureWebGL = function() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
}

GLHost.prototype.ColorCanvas = function(red, green, blue, alpha) {
    this.gl.clearColor(red, green, blue, alpha);
}