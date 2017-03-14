let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("drawing-plane");
    let gl = canvas.getContext("webgl");

    let slider1 = document.getElementById("slider1");
    let slider2 = document.getElementById("slider2");
    let checkbox1 = document.getElementById("checkbox1");

    // change what is assigned to these variables to change the model and the shader;
    let objectAttributes = pipeObjectAttributes;
    let vertexShaderSource = shadingVertexShader;
    let fragmentShaderSource = shadingFragmentShader;

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
    let modelViewMatrix = gl.getUniformLocation(shaderProgram, "modelViewMatrix");
    let normalMatrix = gl.getUniformLocation(shaderProgram, "normalMatrix");
    let projectionMatrix = gl.getUniformLocation(shaderProgram, "projectionMatrix");
    let time = gl.getUniformLocation(shaderProgram, "time");
    let wireframe = gl.getUniformLocation(shaderProgram, "wireframe");

    // set up our attributes
    let positionAttribute = gl.getAttribLocation(shaderProgram, "position");
    gl.enableVertexAttribArray(positionAttribute);

    let normalAttribute = gl.getAttribLocation(shaderProgram, "normal");
    gl.enableVertexAttribArray(normalAttribute);

    let barycentricAttribute = gl.getAttribLocation(shaderProgram, "barycentric");
    gl.enableVertexAttribArray(barycentricAttribute);

    let posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectAttributes.vertices), gl.STATIC_DRAW);

    let normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(objectAttributes.vertexNormals), gl.STATIC_DRAW);

    let barycentricCoords = [];
    for(let i = 0; i < objectAttributes.vertices.length / 3; i++) {
        barycentricCoords.push(((i % 3 == 0) ? (1.0) : (0.0)));
        barycentricCoords.push(((i % 3 == 1) ? (1.0) : (0.0)));
        barycentricCoords.push(((i % 3 == 2) ? (1.0) : (0.0)));
    }

    let barycentricBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, barycentricBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(barycentricCoords), gl.STATIC_DRAW);

    function draw() {
        let angle1 = slider1.value*0.01*Math.PI;

        // Circle around the y-axis
        let eye = [500*Math.sin(angle1),slider2.value, 500*Math.cos(angle1)];
        let target = [0,100,0];
        let up = [0,1,0];

        let modelTransform = m4.scaling([70, 70, 70]);
        let cameraTransform = m4.inverse(m4.lookAt(eye,target,up));
        let modelViewTransform = m4.multiply(modelTransform,cameraTransform);

        let normalTransform = m4.transpose(m4.inverse(modelViewTransform));

        let projectionTransform = m4.perspective(Math.PI/4,1,10,1000);

        // Clear screen, prepare for rendering
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up uniforms & attributes
        gl.uniformMatrix4fv(modelViewMatrix, false, modelViewTransform);
        gl.uniformMatrix4fv(normalMatrix, false, normalTransform);
        gl.uniformMatrix4fv(projectionMatrix, false, projectionTransform);
        gl.uniform1f(time, + new Date());
        if(checkbox1.checked) {
            gl.uniform1f(wireframe, 1.0);
        }
        else {
            gl.uniform1f(wireframe, false, 0.0);
        }
        
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
        gl.vertexAttribPointer(positionAttribute, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.vertexAttribPointer(normalAttribute, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, barycentricBuffer);
        gl.vertexAttribPointer(barycentricAttribute, 3, gl.FLOAT, false, 0, 0);

        // Do the drawing
        gl.drawArrays(gl.TRIANGLES, 0, objectAttributes.vertices.length / 3);
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    checkbox1.addEventListener("change", draw);
    draw();
})();