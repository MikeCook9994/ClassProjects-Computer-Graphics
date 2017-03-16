let m4 = twgl.m4;

(() => {
    let canvas = document.getElementById("drawing-plane");
    let glHost = new GLHost(canvas.getContext("webgl"));

    let slider1 = document.getElementById("slider1");
    let slider2 = document.getElementById("slider2");
    let checkbox1 = document.getElementById("checkbox1");

    // change what is assigned to these variables to change the model and the shader;
    let objectAttributes = pipeObjectAttributes;

    let vertexShader = glHost.CreateAndCompileShader(glHost.gl.VERTEX_SHADER, shadingVertexShader);
    if(vertexShader == null) {
        return null;
    } 
    
    let fragmentShader = glHost.CreateAndCompileShader(glHost.gl.FRAGMENT_SHADER, shadingFragmentShader);
    if(fragmentShader == null) {
        return null;
    } 

    let shaderProgram = glHost.CreateAndConfigureProgram(vertexShader, fragmentShader);
    if(shaderProgram == null) {
        return null;
    }

    let uniformNames = ["modelViewMatrix", "normalMatrix", "projectionMatrix", "time", "wireframe"];
    let uniformLocations = glHost.GetUniformLocations(shaderProgram, uniformNames);

    let attributeNames = ["position", "normal", "barycentric"];
    let attributeLocations = glHost.GetAttributeLocations(shaderProgram, attributeNames);

    // let positionAttribute = glHost.gl.getAttribLocation(shaderProgram, "position");
    // glHost.gl.enableVertexAttribArray(positionAttribute);

    // let normalAttribute = glHost.gl.getAttribLocation(shaderProgram, "normal");
    // glHost.gl.enableVertexAttribArray(normalAttribute);

    // let barycentricAttribute = glHost.gl.getAttribLocation(shaderProgram, "barycentric");
    // glHost.gl.enableVertexAttribArray(barycentricAttribute);

    let posBuffer = glHost.gl.createBuffer();
    glHost.gl.bindBuffer(glHost.gl.ARRAY_BUFFER, posBuffer);
    glHost.gl.bufferData(glHost.gl.ARRAY_BUFFER, new Float32Array(objectAttributes.vertices), glHost.gl.STATIC_DRAW);

    let normalBuffer = glHost.gl.createBuffer();
    glHost.gl.bindBuffer(glHost.gl.ARRAY_BUFFER, normalBuffer);
    glHost.gl.bufferData(glHost.gl.ARRAY_BUFFER, new Float32Array(objectAttributes.vertexNormals), glHost.gl.STATIC_DRAW);

    let barycentricCoords = defineBaryCentricCoordiantes(objectAttributes.vertices.length);
    let barycentricBuffer = glHost.gl.createBuffer();
    glHost.gl.bindBuffer(glHost.gl.ARRAY_BUFFER, barycentricBuffer);
    glHost.gl.bufferData(glHost.gl.ARRAY_BUFFER, new Float32Array(barycentricCoords), glHost.gl.STATIC_DRAW);

    // set up our attributes
    // let attributeNames = ["position", "normal", "barycentric"];
    // let attributeLocations = glHost.GetAttributeLocations(shaderProgram, attributeNames);

    // let barycentricCoords = defineBaryCentricCoordiantes(objectAttributes.vertices.length / 3);
    // let barycentricBuffer = glHost.CreateBufferAndBufferData(glHost.gl.ARRAY_BUFFER, new Float32Array(barycentricCoords));
    // let posBuffer = glHost.CreateBufferAndBufferData(glHost.gl.ARRAY_BUFFER, new Float32Array(objectAttributes.vertices));
    // let normalBuffer = glHost.CreateBufferAndBufferData(glHost.gl.ARRAY_BUFFER, new Float32Array(objectAttributes.vertexNormals));

    let position

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
        glHost.gl.clearColor(1.0, 1.0, 1.0, 1.0);
        glHost.gl.enable(glHost.gl.DEPTH_TEST);
        glHost.gl.clear(glHost.gl.COLOR_BUFFER_BIT | glHost.gl.DEPTH_BUFFER_BIT);

        // Set up uniforms & attributes
        glHost.gl.uniformMatrix4fv(uniformLocations["modelViewMatrix"], false, modelViewTransform);
        glHost.gl.uniformMatrix4fv(uniformLocations["normalMatrix"], false, normalTransform);
        glHost.gl.uniformMatrix4fv(uniformLocations["projectionMatrix"], false, projectionTransform);
        glHost.gl.uniform1f(uniformLocations["time"], + new Date());
        if(checkbox1.checked) {
            glHost.gl.uniform1f(uniformLocations["wireframe"], 1.0);
        }
        else {
            glHost.gl.uniform1f(uniformLocations["wireframe"], 0.0);
        }
        
        glHost.gl.bindBuffer(glHost.gl.ARRAY_BUFFER, posBuffer);
        glHost.gl.vertexAttribPointer(attributeLocations["position"], 3, glHost.gl.FLOAT, false, 0, 0);

        glHost.gl.bindBuffer(glHost.gl.ARRAY_BUFFER, normalBuffer);
        glHost.gl.vertexAttribPointer(attributeLocations["normal"], 3, glHost.gl.FLOAT, false, 0, 0);

        glHost.gl.bindBuffer(glHost.gl.ARRAY_BUFFER, barycentricBuffer);
        glHost.gl.vertexAttribPointer(attributeLocations["barycentric"], 3, glHost.gl.FLOAT, false, 0, 0);

        // Do the drawing
        glHost.gl.drawArrays(glHost.gl.TRIANGLES, 0, objectAttributes.vertices.length / 3);
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    checkbox1.addEventListener("change", draw);
    draw();
})();

function defineBaryCentricCoordiantes(length) {
    let barycentricCoords = [];
    for(let i = 0; i < length / 3; i++) {
        // these ternary operators determine which vertex should have value one. These rest will be zero.
        barycentricCoords.push(((i % 3 == 0) ? (1.0) : (0.0)));
        barycentricCoords.push(((i % 3 == 1) ? (1.0) : (0.0)));
        barycentricCoords.push(((i % 3 == 2) ? (1.0) : (0.0)));
    }
    return barycentricCoords;
} 