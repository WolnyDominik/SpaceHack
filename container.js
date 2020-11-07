class Container {
    constructor(x = 0, y = 0, width, height, background, content, callback) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.background = background;
        this.callback = callback;
        this.content = content;
        this.active = false;
        this.tick = 0;
        for (let i = 0; i < this.content.length; i++) {
            this.content[i].x += canvas.width / 2 + this.x - this.content[i].width / 2;
            this.content[i].y += canvas.height / 2 + this.y - this.content[i].height / 2;
        }
    }

    draw() {
        ctx.save();

        ctx.save();

        ctx.translate(canvas.width / 2 + this.x, canvas.height / 2 + this.y);
        ctx.fillStyle = this.background;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();

        for (let i = 0; i < this.content.length; i++) {
            this.content[i].draw();
        }

        ctx.restore();
    }

    update() {
        this.tick++;
        for (let i = 0; i < this.content.length; i++) {
            this.content[i].update();
        }
    }

    onMove(mouse) {
        for (let i = 0; i < this.content.length; i++) {
            this.content[i].onMove(mouse);
        }
    }

    onClick(mouse) {
        for (let i = 0; i < this.content.length; i++) {
            this.content[i].onClick(mouse);
        }
    }
    onKeyDown(key) {
        for (let i = 0; i < this.content.length; i++) {
            this.content[i].onKeyDown(key);
        }
    }
}