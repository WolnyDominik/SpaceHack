class Meassage {
    constructor(x, y, width, height, text, textcolor, fontsize, duration) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.textcolor = textcolor;
        this.fontsize = fontsize;
        this.startTime = time;
        this.endTime = duration + time;
    }

    draw() {
        ctx.save();
        ctx.fillStyle = "rgba(0,0,0,255)";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.font = this.fontsize + "px 'Press Start 2P'";
        ctx.fillStyle = this.textcolor;
        ctx.textAlign = "center";
        ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height/2);
        ctx.restore();
    }
    update() {
        this.draw();
    }
}

function meassageManager() {
    if (meassages.length != 0) {
        for (let i = 0; i < meassages.length; i++) {
            if (time > meassages[i].endTime) {
                meassages.splice(i, 1);
            } else {
                meassages[i].update();
            }
        }
    }
}