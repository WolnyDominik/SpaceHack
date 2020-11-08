class Captcha {
    constructor(callback) {
        this.image = new Image();
        this.x = 0;
        this.y = 0;
        this.width = 280;
        this.height = 280;
        this.callback = callback;
        this.done = false;
        this.clicked = false;
    }

    update() {
        if (this.done) {
            if (this.callback && this.tick >= 120) {
                this.done = false;
                this.callback();
            }
        }
    }

    onClick(mouse) {
        if (mouse.x > this.x &&
            mouse.x < this.x + this.width &&
            mouse.y > this.y &&
            mouse.y < this.y + this.height &&
            (mouse.buttons & 1) == 1) {

        }
    }

    onMove(mouse) {

    }
    onKeyDown(key) {

    }
    draw() {
        ctx.save();

        if (!this.done) {
            ctx.save();

            ctx.fillStyle = "black";


            ctx.restore();

        } else {
            ctx.font = "42px 'Press Start 2P'";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(" DONE !!!", this.x + this.width / 2, this.y + this.height / 2);
        }

        ctx.restore();
    }
}