class Screen {
    constructor() {
        this.keyState = new Array(128);
        this.mouse = {x: 0, y: 0, buttons: 0};
        this.keyUp = 87;
        this.keyDown = 83;
        this.keyLeft = 65;
        this.keyRight = 68;

        this.mouseDown = false;
        this.mouseUp = false;

       
    }

    update() {

    }

    draw() {

    }

    onClick(x, y, buttons) {
        console.log("XDDDDD");
        this.mouse.x = x;
        this.mouse.y = y;
        this.mouse.buttons;
        return false;
    }

    onDrag(x, y, button) {

    }

    onMove(x, y) {

    }

    onKeyDown(key) {
        console.log(key);
        this.keyState[key] = true;
    }

    onKeyUp(key) {  
        this.keyState[key] = false;
    }

    pause() {
        
    }

}
