function WebGLApp(htmlCanvasId) {
    this.gl = document.getElementById(htmlCanvasId).getContext("webgl");
    this.textureCount = 0;
    this.propertyCache = {};
}

WebGLApp.prototype.GetGLProperty = function(propertyName) {
    if(this.propertyCache.hasOwnProperty(propertyName)) {
        return this.propertyCache[propertyName];
    }
    this.propertyCache[propertyName] = eval("this.gl." + propertyName);
    return this.propertyCache[propertyName];
}

WebGLApp.prototype.CreateAndCompileShader = function(shaderType, shaderSource) {
     let shader = this.gl.createShader(shaderType);
     this.gl.shaderSource(shader, shaderSource);
     this.gl.compileShader(shader);
     if(!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
         alert(this.gl.getShaderInfoLog(shader));
         return null;
     }
     return shader;
}

WebGLApp.prototype.CreateAndConfigureProgram = function(vertexShader, fragmentShader) {
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

WebGLApp.prototype.SetShaderProgram = function(shaderProgram) {
    this.gl.useProgram(shaderProgram);
}

WebGLApp.prototype.GetUniformLocations = function(shaderProgram, uniforms) {
    Object.keys(uniforms).forEach((uniformName) => {
       uniforms[uniformName].location = this.gl.getUniformLocation(shaderProgram, uniformName);
    });
}

WebGLApp.prototype.GetAttributeLocations = function(shaderProgram, attributes) {
    Object.keys(attributes).forEach((attributeName) => {
        attributes[attributeName].location = this.gl.getAttribLocation(shaderProgram, attributeName);
    });
}

WebGLApp.prototype.BufferAttributeData = function(shaderProgram, attributes) {
    this.gl.useProgram(shaderProgram);
    Object.keys(attributes).forEach((attributeName, index) => {
        if(attributes[attributeName].location != -1) {
            this.gl.vertexAttribPointer(attributes[attributeName].location, attributes[attributeName].size, this.gl.FLOAT, false, 0, 0);        
            this.gl.enableVertexAttribArray(attributes[attributeName].location);
        }
        if(attributes[attributeName].buffer === null) {
            attributes[attributeName].buffer = this.gl.createBuffer();
        }
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attributes[attributeName].buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, attributes[attributeName].value, this.gl.STATIC_DRAW);
    });
}

WebGLApp.prototype.SpecifyAttributes = function(attributes) {
    Object.keys(attributes).forEach((attributeName) => {
        if(attributes[attributeName].buffer !== null) {
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attributes[attributeName].buffer);
        }
        if(attributes[attributeName].location != -1) {
            this.gl.vertexAttribPointer(attributes[attributeName].location, attributes[attributeName].size, this.gl.FLOAT, false, 0, 0);
        }
    });
}

WebGLApp.prototype.SetupTexture = function(textureImageSource) {
    let texture = this.gl.createTexture();
    let activeTextureProperty = eval("this.gl.TEXTURE" + this.textureCount);
    this.texureCount++

    this.gl.activeTexture(activeTextureProperty);
    this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);

    let textureImage = new Image();
    textureImage.onload = (() => {
        this.gl.activeTexture(activeTextureProperty);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, textureImage);

        this.gl.generateMipmap(this.gl.TEXTURE_2D);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    });
    textureImage.crossOrigin = "anonymous";
    textureImage.src = textureImageSource;

    return new Texture(textureImageSource, activeTextureProperty, texture);
}

WebGLApp.prototype.SetupSkybox = function(textureImageSource) {
    let texture = this.gl.createTexture();
    let activeTextureProperty = eval("this.gl.TEXTURE" + this.textureCount);
    this.texureCount++

    this.gl.activeTexture(activeTextureProperty);
    this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, texture);
    this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.gl.RGBA, 1, 1, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, null);

    let textureImage = new Image();
    textureImage.onload = (() => {
        this.gl.activeTexture(activeTextureProperty);
        this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, texture);
        this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, textureImage);

        this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP);
        this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
        this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    });
    textureImage.crossOrigin = "anonymous";
    textureImage.src = textureImageSource;

    return new Texture(textureImageSource, activeTextureProperty, texture);
}

WebGLApp.prototype.EnableTextures = function(textures) {
    textures.forEach((texture) => {
        this.gl.activeTexture(texture.textureUnit);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture.webGLTexture);
    });
}

WebGLApp.prototype.ConfigureWebGL = function() {
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
}

WebGLApp.prototype.ColorCanvas = function(red, green, blue, alpha) {
    this.gl.clearColor(red, green, blue, alpha);
}

WebGLApp.prototype.Draw = function(length) {
    this.gl.drawArrays(this.gl.TRIANGLES, 0, length)
}