class OreBreaker {
    constructor(callback) {
        this.image = new Image();
        this.image.src = "/src/img/diax.png";
        this.x = 0;
        this.y = 0;
        this.width = this.image.width;
        this.height = this.image.height;
        this.completion = 0;
        this.callback = callback;
        this.tick = 0;
        this.done = false;
    }

    update() {
        this.tick++;
        if (!this.done && this.tick%20 == 0 && this.completion > 0)
            this.completion -= 10;
        if (this.done) {
            if (this.callback && this.tick >= 120) {
                this.tick = 0;
                this.callback();
            }
        }
    }
    
    onClick(mouse) {
        if (mouse.x > this.x && 
            mouse.x < this.x + this.width && 
            mouse.y > this.y && 
            mouse.y < this.y + this.height &&
            mouse.buttons&1 == 1 
        ){
            this.completion += 20;
            this.tick = 0
            if (this.completion >= 100)
            {
                this.completion = 0;
                this.tick = 0;
                this.done = true;
            }
        }
    }

    onMove(mouse) {
        
    }
    onKeyDown(key) {
    
    }
    draw() {
        ctx.save();

        if(!this.done)
        {
            ctx.save();
        
            ctx.font="24px 'Press Start 2P'";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(this.completion+"%", this.x-190, this.y);

            ctx.restore();

            ctx.drawImage(
                this.image, 0,0, 
                this.width, this.height, 
                this.x, this.y,
                this.width, this.height
            );
        } else {
            ctx.font="42px 'Press Start 2P'";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(" DONE !!!", this.x+this.width/2, this.y+this.height/2);
        }

        ctx.restore();
    }
}