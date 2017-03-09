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
            
            let objectFileJson = {
                v: [],
                vt: [], 
                vn: [],
                vp: [],
                f: {
                    vi: [],
                    vti: [],
                    vni: []
                }
            };

            lines.forEach((line, index, array) => {
                let lineContent = line.split(" ");
                switch(lineContent[0]) {
                    case "v": {
                            let floatArray = ParseFloatArray([lineContent[1], lineContent[2], lineContent[3]]);
                            objectFileJson.v.push(floatArray);
                        }
                        break;
                    case "vt": {
                            let floatArray = ParseFloatArray([lineContent[1], lineContent[2], lineContent[3]]);
                            objectFileJson.vt.push(floatArray);
                        }
                        break;
                    case "vn": {
                            let floatArray = ParseFloatArray([lineContent[1], lineContent[2], lineContent[3]]);
                            objectFileJson.vt.push(floatArray);                
                        }
                        break;
                    case "vp": {
                            let floatArray = ParseFloatArray([lineContent[1], lineContent[2]]);
                            objectFileJson.vt.push(floatArray);
                        }
                        break;
                    case "f":
                        let vertices = ParseFloatArray([lineContent[1].split("/")[0], lineContent[2].split("/")[0], lineContent[3].split("/")[0]]);
                        let textures = ParseFloatArray([lineContent[1].split("/")[1], lineContent[2].split("/")[1], lineContent[3].split("/")[1]]);
                        let normals = ParseFloatArray([lineContent[1].split("/")[2], lineContent[2].split("/")[2], lineContent[3].split("/")[2]]);

                        objectFileJson.f.vi.push(vertices);
                        objectFileJson.f.vti.push(textures);
                        objectFileJson.f.vni.push(normals);
                        break;
                }
            });

            let objectAsJSON = JSON.stringify(objectFileJson, null, 4);
            fs.open("." + process.argv[2].split(".")[1] + ".json", "w", (err, fd) => {
                if(err) {
                    throw err;
                }
                fs.write(fd, objectAsJSON, "utf8", (err) => {
                    if(err) {
                        throw err;
                    }
                })
            });
        });
    });
})();

function ParseFloatArray(array) {
    let floatArr = [];
    array.forEach((value, index, arr) => {
        if(value === "") {
            value = '-1.0';
        }
        floatArr.push(parseFloat(value));
    });
    return floatArr;
}