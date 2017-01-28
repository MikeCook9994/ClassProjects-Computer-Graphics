(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let scene = new Scene(context, canvas.height, canvas.width);
    let blockSize = document.getElementById("blockSize");

    scene.Draw(4);

    blockSize.addEventListener('input', () => {
        scene.Draw(blockSize.value);
    });
})();

