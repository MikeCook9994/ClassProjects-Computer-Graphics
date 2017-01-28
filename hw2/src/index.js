(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let scene = new Scene(context, canvas.height, canvas.width);
    scene.Draw(4);
})();

