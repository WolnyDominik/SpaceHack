var canvas, ctx;

var keyUp = 87;
var keyDown = 83;
var keyLeft = 65;
var keyRight = 68;



var mouseDown = false;
var mouseUp = false;

var deltaTime, now, time = 0,
    last = Date.now();

var up = false,
    down = false,
    left = false,
    right = false;

function main() {
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    tilesheet = new Image();
    tick();
}

function tick() {
    now = Date.now();
    deltaTime = (now - last) / 1000;
    last = now;
    time += deltaTime;
    if (up) {

    }
    if (down) {

    }
    if (left) {

    }
    if (right) {

    }

    requestAnimationFrame(tick);

}



document.onkeydown = function (e) {
    console.log(e.keyCode);
    if (e.keyCode == keyUp) up = true;
    else if (e.keyCode == keyDown) down = true;
    else if (e.keyCode == keyLeft) left = true;
    else if (e.keyCode == keyRight) right = true;
}
document.onkeyup = function (e) {
    if (e.keyCode == keyUp) up = false;
    else if (e.keyCode == keyDown) down = false;
    else if (e.keyCode == keyLeft) left = false;
    else if (e.keyCode == keyRight) right = false;
}





function draw() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    //  ctx.drawImage(tilesheet, x * 122, y * 142, 120, 140, i * 120 * this.sizeHexMultiplayer, (j * 103.9) * this.sizeHexMultiplayer, 121 * this.sizeHexMultiplayer, 141 * this.sizeHexMultiplayer);

}
main();

canvas.onclick = function (e) {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.translate(currentXPosition, currentYPosition);
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
}