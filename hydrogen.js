class Hydrogen {
    constructor(x, y, callback) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 128;
        this.hydrogen = Math.floor(Math.random() * 80);
        this.oxygen = Math.floor(Math.random() * 80);
        this.nitrogen = Math.floor(Math.random() * 80);
        if ((this.hydrogen + this.oxygen) > 100) {
            this.oxygen = Math.floor((100 - this.hydrogen) / 2);
            this.nitrogen = Math.floor(this.oxygen);
        }
        if ((this.hydrogen + this.oxygen + this.nitrogen) > 100) {
            this.nitrogen = Math.floor(100 - this.hydrogen - this.oxygen);
        }
        this.text = "level of:\n" + "wodór: " + this.hydrogen + "%\ntlen: " + this.oxygen + "%\nazot: " + this.nitrogen + "%\nbezpiecznie naciśnij 'b'" + "\nnie bezpiecznie naciśnij 'n'";
        this.lineheight = 25;
        this.lines = this.text.split('\n');
        this.textcolor = "rgba(255,255,168,255)";
        this.fontsize = 20;
    }
    draw() {
        ctx.save();
        ctx.font = this.fontsize + "px 'Press Start 2P'";
        ctx.fillStyle = this.textcolor;
        ctx.textAlign = "center";
        for (let i = 0; i < this.lines.length; i++) {
            ctx.fillText(this.lines[i], this.x + this.width / 2, this.y + (i * this.lineheight));
        }
        ctx.restore();
    }
    onClick(mouse) {
        //  console.log(this.hydrogen + " " + this.oxygen + " " + this.nitrogen);
    }
    onMove(mouse) {

    }
    onKeyDown(key) {
        this.output = net.run({
            w: this.hydrogen / 100,
            t: this.oxygen / 100,
            a: this.nitrogen / 100
        });
        if (key == 66) {
            if (this.output[1] >= 0.5) {
                meassages.push(new Meassage((canvas.width - 600) / 2, (canvas.height - 128) / 2, 600, 128, "możesz bezpiecznie wejść", "rgba(255,0,0,255)", this.fontsize, 5));
            } else {
                meassages.push(new Meassage((canvas.width - 300) / 2, (canvas.height - 128) / 2, 300, 128, "kaboom", "rgba(255,0,0,255)", this.fontsize, 5));
            }
        }
        if (key == 78) {
            if (this.output[0] >= 0.5) {
                meassages.push(new Meassage((canvas.width - 300) / 2, (canvas.height - 128) / 2, 300, 128, "kaboom", "rgba(255,0,0,255)", this.fontsize, 5));
            } else {
                meassages.push(new Meassage((canvas.width - 600) / 2, (canvas.height - 128) / 2, 600, 128, "Wypompowywanie wodoró rozpoczęte", "rgba(255,0,0,255)", this.fontsize, 5));
            }
        }
    }
    update() {

    }

}