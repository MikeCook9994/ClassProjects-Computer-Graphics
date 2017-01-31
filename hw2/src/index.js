(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    
    let fireballScale = document.getElementById("fireballScale");
    let fireBarLocation = document.getElementById("fireBarLocation");
    let pipeHeight = document.getElementById("pipeHeight");
    let pipeLocation = document.getElementById("pipeLocation");
    let pipeScale = document.getElementById("pipeScale");
    
    let scene = new Scene(context, canvas.height, canvas.width);
    let firebar = new Firebar(context);
    let pipe = new Pipe(context, canvas.height);

    let audio = new Audio("./sound/1-04-castle.mp3");
    audio.loop = true;
    audio.play();

    function clearCanvas() {
        context.clearRect(0, 0, canvas.Width, canvas.height);
    }

    function animateFireBar(timestamp) {
        clearCanvas();
        scene.Draw();
        pipe.Draw(Number(pipeLocation.value), Number(pipeHeight.value), Number(pipeScale.value));
        firebar.Draw(Number(fireBarLocation.value), 5, Number(fireballScale.value));
        requestAnimationFrame(animateFireBar);
    }

    requestAnimationFrame(animateFireBar);
})();

