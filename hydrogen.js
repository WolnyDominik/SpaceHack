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
        this.stun = 0;
        this.lastTick = 0;
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
        this.lineheight = 25;

        this.textcolor = "rgba(255,255,255,255)";
        this.fontsize = 20;
    }
    draw() {
        this.text = "level of:\n" + "wodór: " + this.hydrogen + "%\ntlen: " + this.oxygen + "%\nazot: " + this.nitrogen + "%\nbezpiecznie naciśnij 'b'" + "\nnie bezpiecznie naciśnij 'n'";
        this.lines = this.text.split('\n');
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
    onClick(mouse) {}
    onMove(mouse) {

    }
    onKeyDown(key) {
        if (this.conscious) {
            this.output = net.run({
                w: this.hydrogen / 100,
                t: this.oxygen / 100,
                a: this.nitrogen / 100
            });
            if (key == 66) {
                if (this.output['nie'] >= 0.5) {
                    meassages.push(new Meassage((canvas.width - 600) / 2, (canvas.height - 128) / 2, 600, 128, "Mieszanka powietrza stabilna", "rgba(255,0,0,255)", this.fontsize, 2));
                    this.done = true;
                    this.conscious = true;
                    this.thick = 80;
                } else {
                    meassages.push(new Meassage((canvas.width - 500) / 2, (canvas.height - 128) / 2, 500, 128, "Jesteś nieprzytomny!", "rgba(255,0,0,255)", this.fontsize, 7));
                    this.conscious = false;
                    this.hydrogen -= 10;
                }
            }
            if (key == 78) {
                meassages.push(new Meassage((canvas.width - 800) / 2, (canvas.height - 128) / 2, 800, 128, "Wypompowywanie wodoru rozpoczete.", "rgba(255,0,0,255)", this.fontsize, 3));
                this.done = true;
                this.conscious = true;
                this.thick = -10*this.hydrogen;

            }
        }
    }
    update() {
        if (!this.conscious) {
            this.stun+= deltaTime*10;
        }
        if (this.stun >= 70) {
            this.conscious = true;
            this.stun = 0;
        }
        if (this.done) {
            this.thick+=deltaTime*10;
            if (this.hydrogen > 15 && Math.floor(this.thick) % 50 == 0 && this.lastTick != Math.floor(this.thick)) {
                this.lastTick =  Math.floor(this.thick);
                this.hydrogen -= 10;
            }
            if(this.hydrogen < 25){
                this.thick = 100;
            }
        }
        if (this.done && this.thick >= 100) {
            this.done = false;
            this.callback();
        }
    }

}