class Hydrogen {
    constructor(x, y, callback) {
        this.x = x;
        this.y = y;
        this.done = false;
        this.conscious = true;
        this.callback = callback;
        this.width = 200;
        this.height = 128;
        this.thick = 0;
        this.lineheight = 25;
        this.textcolor = "rgba(255,255,255,255)";
        this.fontsize = 20;
    }
    draw() {
        if (!this.done || this.thick <= 100) {
            ctx.save();
            ctx.font = this.fontsize + "px 'Press Start 2P'";
            ctx.fillStyle = this.textcolor;
            ctx.textAlign = "center";
            for (let i = 0; i < this.lines.length; i++) {
                ctx.fillText(this.lines[i], this.x + this.width / 2, this.y + (i * this.lineheight));
            }
            ctx.restore();
        }
    }
    onClick(mouse) {
        //  console.log(this.hydrogen + " " + this.oxygen + " " + this.nitrogen);
    }
    onMove(mouse) {

    }
    onKeyDown(key) {


    }
    update() {

    }
}