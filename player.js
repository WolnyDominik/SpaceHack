class Player {
    constructor() {
        this.texture = new Image();
        this.texture.src = "/src/ziemniaczki.png";
        this.dir = false;
        this.angle = 0;
        this.step = new Audio("/src/sound/step.mp3");
        this.step.volume = 0.25;
    }
    update(keyState) {
        const oscilation = 8;
        this.angle = 0;
        if (keyState[65]) {
            this.dir = false;
            this.angle += oscilation*Math.PI/180;
        }
        if (keyState[68]) {
            this.dir = true;
            this.angle -= oscilation*Math.PI/180;
        }
    }
    draw(ticks) {
        const jump = 2.5;
        ctx.save();
        ctx.translate(0,-18);
        ctx.translate(32,64);
        if (this.angle) ctx.translate(0,-Math.abs(Math.cos(ticks)*jump));
        if (this.angle && (Math.sin(ticks*7/8) > 0.95 || Math.sin(ticks*7/8) < -0.95))
            this.step.play()
        ctx.rotate(this.angle*Math.sin(ticks));
        if (this.dir) ctx.scale(-1,1);
        ctx.drawImage(this.texture,skinID*64,0,64,64,-32,-64,64,64);
        ctx.restore();
    }
}