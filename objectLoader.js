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
            
            let vectorData = {
                v: [],
                vt: [], 
                vn: [],
            };

            let outputData = {
                vertices: [],
                vertexTextureCoordinates: [],
                vertexNormals: []
            }

            lines.forEach((line, index, array) => {
                let lineContent = line.split(" ");
                switch(lineContent[0]) {
                    case "v": {
                        let floatArray = ParseFloatArray([lineContent[1], lineContent[2], lineContent[3]], false);
                        vectorData.v.push(floatArray);
                    }
                    break;
                    case "vt": {
                        let floatArray = ParseFloatArray([lineContent[1], lineContent[2]], false);
                        vectorData.vt.push(floatArray);
                    }
                    break;
                    case "vn": {
                        let floatArray = ParseFloatArray([lineContent[1], lineContent[2], lineContent[3]], false);
                        vectorData.vn.push(floatArray);                
                    }
                    break;
                    // faces are guranteed to come after we've parsed all of the vector data so these operations are safe.
                    case "f": {
                        let face = [];
                        face.push(ParseFloatArray(lineContent[1].split("/"), true));
                        face.push(ParseFloatArray(lineContent[2].split("/"), true));
                        face.push(ParseFloatArray(lineContent[3].split("/"), true)); 

                        face.forEach((vertexPropertyIndex, index, array) => {
                            let vertexTextureCoordinate = [];
                            if(vertexPropertyIndex[1] !== -1) {
                                vertexTextureCoordinate = vectorData.vt[vertexPropertyIndex[1]];
                            }

                            outputData.vertices.push(vectorData.v[vertexPropertyIndex[0]]);
                            if(vertexTextureCoordinate.length !== 0) {
                                outputData.vertexTextureCoordinates.push(vertexTextureCoordinate);
                            }
                            outputData.vertexNormals.push(vectorData.vn[vertexPropertyIndex[2]]);
                        });
                    }
                    break;
                }
            });

            //generate the json as a javascript variable
            let objectAsJSONString = JSON.stringify(outputData, null, 4);
            let arrayRegex = /(\[)\n\s*([+-]?[0-9]*[.]?[0-9]+[\,]?)\n\s*([+-]?[0-9]*[.]?[0-9]+[\,]?)\n\s*([+-]?[0-9]*[.]?[0-9]+[\,]?)\n\s*(\])([\,]?)/g;
            let pathWithoutExtension = process.argv[2].split(".")[1];
            let prettyJson = "let " + pathWithoutExtension.split("/")[pathWithoutExtension.split("/").length - 1] + "ObjectAttributes = \n" + objectAsJSONString.replace(arrayRegex, '$2 $3 $4$6');

            let textureCoordRegex = /(\[)\n\s*([+-]?[0-9]*[.]?[0-9]+[\,]?)\n\s*([+-]?[0-9]*[.]?[0-9]+[\,]?)\n\s*(\])([\,]?)/g;
            prettyJson = prettyJson.replace(textureCoordRegex, "$2 $3$5");
            
            if(!fs.existsSync("." + (pathWithoutExtension.split("/").slice(0, pathWithoutExtension.split("/").length - 1).join("/")))) {
                fs.mkdirSync("." + (pathWithoutExtension.split("/").slice(0, pathWithoutExtension.split("/").length - 1).join("/")));
            }

            // write variable to javascript file
            fs.open("." + pathWithoutExtension + "Model.js", "w", (err, fd) => {
                if(err) {
                    throw err;
                }

                fs.write(fd, prettyJson, "utf8", (err) => {
                    if(err) {
                        throw err;
                    }
                });
            });
        });
    });
})();

function ParseFloatArray(array, isIndex) {
    let floatArr = [];
    array.forEach((value, index, arr) => {
        if(value === "") {
            value = '0.0';
        }
        value = parseFloat(value);
        if(isIndex) {
            value--;
        }
        floatArr.push(value);

    });
    return floatArr;
}