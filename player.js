class Player {
    constructor() {
        this.texture = new Image();
        this.texture.src = "/src/panziemniaczek.png";
        this.dir = false;
        this.angle = 0;
    }
    update(keyState) {
        this.angle = 0;
        if (keyState[65]) {
            this.dir = false;
            this.angle += 15*Math.PI/180;
        }
        if (keyState[68]) {
            this.dir = true;
            this.angle -= 15*Math.PI/180;
        }
    }
    draw(ticks) {
        ctx.save();
        ctx.translate(0,-18);
        ctx.translate(32,64);
        if (this.angle) ctx.translate(0,-Math.abs(Math.cos(ticks)*5));
        ctx.rotate(this.angle*Math.sin(ticks));
        if (this.dir) ctx.scale(-1,1);
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.drawImage(this.texture,0,0,64,64,-32,-64,64,64);
        ctx.restore();
    }
}