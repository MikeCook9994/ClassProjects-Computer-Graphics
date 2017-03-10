let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("drawing-plane");
    let gl = canvas.getContext("webgl");

    let slider1 = document.getElementById('slider1');
    let slider2 = document.getElementById('slider2');
    let slider3 = document.getElementById('slider3');

    // change what is assigned to these variables to change the model and the shader;
    let objectAttributes = pipeObjectAttributes;
    let vertexShaderSource = basicVertexShader;
    let fragmentShaderSource = basicFragmentShader;

    // compile vertex shader
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    
    // compile fragment shader
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    // create shader program and attach shaders
    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    // set up our uniforms
    let mvpMatrix = gl.getUniformLocation(shaderProgram, "uMVP");

    // set up our attributes
    let positionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(positionAttribute);

    let colorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(colorAttribute);

    // create buffers and copy our attributes
    let vertexColors = [];
    for(let i = 0; i < objectAttributes.v.length / 3; i++) {
        vertexColors.push(Math.random());
        vertexColors.push(Math.random());
        vertexColors.push(Math.random());
    }

    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColors), gl.STATIC_DRAW);

    let trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectAttributes.v), gl.STATIC_DRAW);

    let indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(objectAttributes.f.vi), gl.STATIC_DRAW);

    function draw() {
        let angle1 = slider1.value*0.01*Math.PI;

        // Circle around the y-axis
        var eye = [500*Math.sin(angle1),slider2.value,500.0*Math.cos(angle1)];
        var target = [0,slider3.value,0];
        var up = [0,1,0];

        var tModel = m4.multiply(m4.scaling([100,100,100]),m4.axisRotation([1,0,0],0));
        var tCamera = m4.inverse(m4.lookAt(eye,target,up));
        var tProjection = m4.perspective(Math.PI/4,1,10,1000);

        var tMVP=m4.multiply(m4.multiply(tModel,tCamera),tProjection);

        // Clear screen, prepare for rendering
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up uniforms & attributes
        gl.uniformMatrix4fv(mvpMatrix, false, tMVP);
                    
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(colorAttribute, 3, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(positionAttribute, 3, gl.FLOAT, false, 0, 0);

        // Do the drawing
        gl.drawElements(gl.TRIANGLES, objectAttributes.f.vi.length, gl.UNSIGNED_SHORT, 0);
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider3.addEventListener("input",draw);
    draw();
})();