let coinBlock = document.getElementById("coin-block");
let coinBlockContext = coinBlock.getContext('2d');

coinBlockContext.lineWidth = 5;
coinBlockContext.strokeStyle = "red";

coinBlockContext.beginPath();
coinBlockContext.moveTo(50,50);
coinBlockContext.lineTo(100,100);
coinBlockContext.stroke();