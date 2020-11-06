var deltaTime, now, time = 0,
    last = Date.now();



function main() {
    screenManager = new ScreenManager();
    screen = new Screen();
    screenManager.pushScreen(screen);
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

    requestAnimationFrame(tick);

}
console.log("RED SUS");
main();
document.onkeydown = function (e) {
    console.log(e.keyCode);
    screenManager.onKeyDown(e.keyCode);
}

document.onkeyup = function (e) {
    screenManager.onKeyUp(e.keyCode);
}

canvas.oncontextmenu = function (e) {
    e.preventDefault(); 
}

canvas.onmousemove = function (e) {
    //  console.log(e);
}
canvas.onmousedown = function (e) {
    e.preventDefault();
    console.log(e);
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    console.log(x, y);
    screenManager.onClick(x, y, e.buttons);
}
canvas.onmouseup = function (e) {
    //console.log(e);
}