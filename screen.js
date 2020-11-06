class Screen {
    constructor() {
        this.titanic = !float
    }

    update() {

    }

    draw() {

    }

    onClick(x, y, button) {
        return false
    }

    onDrag(x, y, button) {

    }

    onMove(x, y) {

    }

    onKeyDown(key) {

    }

    onKeyUp(key) {

    }

    pause() {

    }

}
document.onkeydown = function (e) {
    console.log(e.keyCode);
    screenManager.onKeyDown(e.keyCode);
}
document.onkeyup = function (e) {
    screenManager.onKeyUp(e.keyCode);
}