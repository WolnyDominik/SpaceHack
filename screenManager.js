class ScreenManager {
    constructor() {
        this.current = 0;
        this.screenstack = new Array();
    }

    pushScreen(screen) {
        if (this.screenstack.length > 0)
            this.current.pause();

        this.screenstack.push();
        this.current = this.screenstack[this.screenstack.length - 1];
    }

    popScreen() {
        tmp = this.screenstack[this.screenstack.length - 1];

        if (this.screenstack.length > 0)
            tmp.soundFrame.pause();

        this.screenstack.pop();
        this.current = this.screenstack[this.screenstack.length - 1];
    }

    clearBuffer() {
        this.screenstack = [];
        this.current = this.screenstack.pop();
    }

    update() {
        this.current.update();
        if (this.screenstack.length > 0)
            this.current.soundFrame.update();
    }

    draw() {
        this.current.update();
    }

    onClick() {
        this.current.onClick(x, y, button);
    }

    onDrag(x, y, button) {
        this.current.onDrag(x, y, button);
    }

    onMove(x, y, button) {
        this.current.onMove(x, y, button);
    }

    onKeyDown(key) {
        this.current.onKeyDown(key);
    }

    onKeyUp(key) {
        this.current.onKeyUp(key);
    }
}

document.onkeydown = function (e) {
    console.log(e.keyCode);
    screenManager.onKeyDown(e.keyCode);
}

document.onkeyup = function (e) {
    screenManager.onKeyUp(e.keyCode);
}