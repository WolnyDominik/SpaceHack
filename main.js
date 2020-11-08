var deltaTime, now, time = 0,
    last = Date.now();
    var meassages = new Array;
    var net = new brain.NeuralNetwork();
    json = {"sizes":[3,3,2],"layers":[{"w":{},"t":{},"a":{}},{"0":{"bias":-0.2586955726146698,"weights":{"w":-1.0924923419952393,"t":0.2373962551355362,"a":0.30591002106666565}},"1":{"bias":0.46730804443359375,"weights":{"w":-4.91607141494751,"t":1.7615315914154053,"a":1.272434949874878}},"2":{"bias":-0.4369356632232666,"weights":{"w":-1.3808224201202393,"t":0.5304842591285706,"a":0.09420944005250931}}},{"nie":{"bias":-1.1768423318862915,"weights":{"0":0.2903709411621094,"1":3.4968507289886475,"2":0.567442774772644}},"tak":{"bias":1.3165600299835205,"weights":{"0":-0.4007349908351898,"1":-3.5971193313598633,"2":-0.7064366340637207}}}],"outputLookup":true,"inputLookup":true,"activation":"sigmoid","trainOpts":{"iterations":20000,"errorThresh":0.09,"log":true,"logPeriod":10,"learningRate":0.3,"momentum":0.1,"callbackPeriod":10,"beta1":0.9,"beta2":0.999,"epsilon":1e-8}};
    net.fromJSON(json);
    
function main() {
    screenManager = new ScreenManager();
    gameScreen = new GameScreen();
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
main();
document.onkeydown = function (e) {
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
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    screenManager.onClick(x, y, e.buttons);
}
canvas.onmouseup = function (e) {
    let x = e.clientX - canvas.offsetLeft;
    let y = e.clientY - canvas.offsetTop;
    screenManager.onClick(x, y, e.buttons);
}