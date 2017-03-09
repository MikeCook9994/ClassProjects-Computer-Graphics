let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("drawing-plane");
    let gl = canvas.getContext("webgl");

    let slider1 = document.getElementById('slider1');
    slider1.value = 0;
    let slider2 = document.getElementById('slider2');
    slider2.value = 0;

    let vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, triangleVertexShader);
    gl.compileShader(vertexShader);
    
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, triangleFragmentShader);
    gl.compileShader(fragmentShader);

    let shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);

    let positionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(positionAttribute);

    let colorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(colorAttribute);

    let mvpMatrix = gl.getUniformLocation(shaderProgram, "uMVP");

    // vertex positions
    let vertexPos = new Float32Array ([
        0.0,  0.0,  0.0,   0.0,  1.0,  0.0,   0.0,  0.0,  1.0,
        0.0,  0.0,  0.0,   1.0,  0.0,  0.0,   0.0,  0.0,  1.0,
        0.0,  0.0,  0.0,   1.0,  0.0,  0.0,   0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,   1.0,  0.0,  0.0,   0.0,  0.0,  1.0 ]);  

    // vertex colors
    let vertexColors = new Float32Array ([
        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0 ]);

    let trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = 12;

    let colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;
    colorBuffer.numItems = 12;

    function draw() {
        let angle1 = slider1.value*0.01*Math.PI;
        let angle2 = slider2.value*0.01*Math.PI;

        // Circle around the y-axis
        var eye = [300*Math.sin(angle1),150.0,300.0*Math.cos(angle1)];
        var target = [0,40,0];
        var up = [0,1,0];

        var tModel = m4.multiply(m4.scaling([100,100,100]),m4.axisRotation([1,1,1],angle2));
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
        gl.vertexAttribPointer(colorAttribute, colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(positionAttribute, trianglePosBuffer.itemSize, gl.FLOAT, false, 0, 0);

        // Do the drawing
        gl.drawArrays(gl.TRIANGLES, 0, trianglePosBuffer.numItems);
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    draw();
})();