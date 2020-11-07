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
        // if (this.screenstack.length > 0)
        //     tmp.soundFrame.pause();
        return tmp;
    }

    clearBuffer() {
        this.screenstack = new Array();
    }

    update() {
        this.screenstack[0].update();
        // if (this.screenstack.length > 0)
        //     this.screenstack[0].soundFrame.update();
    }

    draw() {
        this.screenstack[0].draw();
    }

    onClick(x , y, button) {
        this.screenstack[0].onClick(x, y, button);
    }

    onDrag(x, y, button) {
        this.screenstack[0].onDrag(x, y, button);
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

