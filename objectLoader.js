let fs = require('fs');

(() => {
    fs.open(process.argv[2], "r", (err, fd) => {
        if(err) {
            throw err;
        }
        fs.readFile(fd, 'utf8', (err, data) => {
            if(err) {
                throw err;
            }
            let lines = data.split('\n');
            
            // let objectFileJson = {

            // };

            let vertexCount = 0;
            let vertexTextureCount = 0;
            let vertexNormalCount = 0;
            let vertexParameterSpaceVertices = 0;
            let faceCount = 0;

            lines.forEach((line, index, array) => {
                let lineContent = line.split(" ");
                switch(lineContent[0]) {
                    case "v":
                        vertexCount++;
                        break;
                    case "vt":
                        vertexTextureCount++;
                        break;
                    case "vn":
                        vertexNormalCount++;
                        break;
                    case "vp":
                        vertexParameterSpaceVertices++;
                        break;
                    case "f":
                        faceCount++;
                        break;
                    default:
                        //console.log(line);
                        break;
                }
            });

            console.log("vertexCount: " + vertexCount);
            console.log("vertexTextureCount: " + vertexTextureCount);
            console.log("vertexNormalCount: " + vertexNormalCount);
            console.log("vertexParameterSpaceVertices: " + vertexParameterSpaceVertices);
            console.log("faceCount: " + faceCount);

            // let objectAsJSON = JSON.stringify(objectFileJson);
            // fs.open(process.argv[2].split(".")[0], "w", (err, fd) => {
            //     if(err) {
            //         throw err;
            //     }
            //     fs.write(fd, objectAsJSON, "utf8", (err) => {
            //         if(err) {
            //             throw err;
            //         }
            //     })
            // });
        });
    });
})();