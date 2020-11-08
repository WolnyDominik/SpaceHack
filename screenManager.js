class ScreenManager {
    constructor() {
        this.screenstack = new Array();
    }

    pushScreen(screen) {
        if (this.screenstack.length > 0)
            this.screenstack[0].pause();

        this.screenstack.unshift(screen);
    }

    popScreen() {
        let tmp = this.screenstack.shift();
        return tmp;
    }

    clearBuffer() {
        this.screenstack = new Array();
    }

    update() {
        this.screenstack[0].update();
    }

    draw() {
        this.screenstack[0].draw();
    }

    onClick(x , y, buttons) {
        this.screenstack[0].onClick(x, y, buttons);
    }

    onMove(x, y) {
        this.screenstack[0].onMove(x, y);
    }

    onKeyDown(key) {
        this.screenstack[0].onKeyDown(key);
    }

    onKeyUp(key) {
        this.screenstack[0].onKeyUp(key);
    }
}

