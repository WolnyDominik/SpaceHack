class Container {
    constructor(x = 0, y = 0, width, height, background,img, content, callback) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.background = background;
        this.callback = callback;
        this.content = content;
        this.active = false;
        this.tick = 0;
        this.img=img;
        this.image=new Image();
        switch(this.img){
            case 1:
                this.image.src='/src/TABLECIK.png';
            break;
            default:
                this.image.src='';


        }
        for (let i = 0; i < this.content.length; i++) {
            this.content[i].x += canvas.width / 2 + this.x - this.content[i].width / 2;
            this.content[i].y += canvas.height / 2 + this.y - this.content[i].height / 2;
        }
    }

    draw() {
        ctx.save();

        ctx.save();

        ctx.translate(canvas.width / 2 + this.x, canvas.height / 2 + this.y);
        if(this.img != 0)
            ctx.drawImage(this.image,0,0,1000,500,-500, -250, 1000, 500);
        ctx.fillStyle = this.background;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        ctx.restore();

        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].draw)
                this.content[i].draw();
        }

        ctx.restore();
    }

    update() {
        this.tick++;
        // console.log(this.tick)
        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].update)
                this.content[i].update();
        }
    }

    onMove(mouse) {
        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].onMove) 
                this.content[i].onMove(mouse);
        }
    }

    onClick(mouse) {
        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].onClick)
                this.content[i].onClick(mouse);
        }
    }
    onKeyDown(key) {
        for (let i = 0; i < this.content.length; i++) {
            if (this.content[i].onKeyDown)
                this.content[i].onKeyDown(key);
        }
    }
}