var deltaTime, now, time = 0,
    last = Date.now();
    var meassages = new Array;

function main() {
    screenManager = new ScreenManager();
    gameScreen = new GameScreen();
    menuScreen = new MenuScreen();
    splashScreen = new SplashScreen();
    screenManager.pushScreen(splashScreen);
    canvas = document.querySelector('canvas');
    ctx = canvas.getContext('2d');
    tilesheet = new Image();
    canvas.width = 1280;
    canvas.height = 720;
    ctx.imageSmoothingEnabled = false;
    tick();
}

function tick() {
    now = Date.now();
    deltaTime = (now - last) / 1000;
    last = now;
    time += deltaTime;
    screenManager.update();
    screenManager.draw();
    meassageManager();
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
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    screenManager.onMove(x, y);
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
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    screenManager.onClick(x, y, e.buttons);
}