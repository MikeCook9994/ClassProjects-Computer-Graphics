(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let blockSize = document.getElementById("blockSize");
    let fireballAngle = document.getElementById("fireballScale");

    let scene = new Scene(context, canvas.height, canvas.width);
    let fireball = new Fireball(context);

    blockSize.addEventListener('input', () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        scene.Draw(blockSize.value);
    });

    scene.Draw(4);

    function rotateFireball(timestamp) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        scene.Draw(blockSize.value);
        fireball.Draw(5, fireballScale.value);
        requestAnimationFrame(rotateFireball);
    }
    requestAnimationFrame(rotateFireball);
})();

