(() => {
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext('2d');
    let blockSize = document.getElementById("blockSize");
    let fireballAngle = document.getElementById("fireballAngle");

    let scene = new Scene(context, canvas.height, canvas.width);
    let fireball = new Fireball(context);

    scene.Draw(4);
    fireball.Draw(0, 16);

    fireballAngle.addEventListener('input', () => {
        scene.Draw(blockSize.value);
        fireball.Draw(fireballAngle.value, 16);
    });

    blockSize.addEventListener('input', () => {
        scene.Draw(blockSize.value);
        fireball.Draw(fireballAngle.value, 16);
    });
    
    // let i = 0;
    // setInterval(() => {
    //     fireball.Draw(i, 16);
    //     i++;
    // }, 100);
})();

