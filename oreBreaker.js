class OreBreaker {
    constructor(callback) {
        this.image = new Image();
        this.image.src = "/src/przycisk.png";
        this.x = 0;
        this.y = 0;
        this.width = 200;
        this.height = 200;
        this.completion = 0;
        this.callback = callback;
        this.tick = 0;
        this.done = false;
        this.audio = new Audio("/src/sound/mine.mp3");
        this.audio.volume = 0.5;
        this.clicked=false;
        this.points = true;
    }

    update() {
        this.tick++;
        if (!this.done && this.tick%20 == 0 && this.completion > 0)
            this.completion -= 10;
        if (this.done) {
            if (this.callback && this.tick >= 120) {
                this.tick = 0;
                if (this.done && this.points){
                    finishedTasks++;
                    this.points = false;
                }

                this.callback();
            }
        }
    }
    
    onClick(mouse) {
        if (mouse.x > this.x && 
            mouse.x < this.x + this.width && 
            mouse.y > this.y && 
            mouse.y < this.y + this.height &&
            (mouse.buttons&1) == 1 
        ){
            this.clicked =true;
            if (!this.done) {
                this.completion += 20;
                this.tick = 0;
                this.audio.play();
            }
            if (this.completion >= 200) {
                this.completion = 0;
                this.tick = 0;
                this.done = true;
            }
        }
        else if ( (mouse.buttons&1)==0) {
            this.clicked =false;
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
            ctx.fillText("Press the button to ",this.x+100,this.y-60);
            ctx.fillText("spin up the drill.",this.x+100,this.y-30)
            ctx.fillText("Current RPM: "+this.completion*40, this.x+100, this.y+230);
            ctx.fillText("Needed RPM: "+8000, this.x+100, this.y+260);

            ctx.restore();

            ctx.drawImage(
                this.image, this.clicked?200:0,0, 
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