(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    
    let fireballScale = document.getElementById("fireballScale");
    let fireBarLocation = document.getElementById("fireBarLocation");

    let scene = new Scene(context, canvas.height, canvas.width);
    let firebar = new Firebar(context);

    function animateFireBar(timestamp) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        scene.Draw();
        firebar.Draw(fireBarLocation.value, 5, fireballScale.value);
        requestAnimationFrame(animateFireBar);
    }
    requestAnimationFrame(animateFireBar);
})();

