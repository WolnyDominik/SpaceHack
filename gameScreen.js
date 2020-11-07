class GameScreen extends Screen {
    constructor() {
        super();
        this.ticks = 0;
        this.image = new Image();
    }

    onClick(x, y, buttons){
        super.onClick(x, y, buttons);

    }

    onMove(x, y, buttons) {
        super.onMove(x, y);
        
    }

    update(){
        // console.log(this.ticks);
        this.ticks++;
    }

    draw(){
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.save();
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.restore();
      
    }
}

