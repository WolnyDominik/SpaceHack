class MenuScreen extends Screen {
    constructor() {
        super();
        this.ticks = 0;
        this.image = new Image();
        this.image.src = "/src/background.png";
        this.Mbut = new Array();
        this.Mbut.push(new Button(150, 150, 600, 55, "PLAY" , "rgba(70,100,168,255)" , "rgba(90,120,188,255)" , "rgba(240,128,0,255)" , "rgba(255,255,255,225", 45));
        this.Mbut.push(new Button(150, 300, 600, 55, "OPTIONS" , "rgba(70,100,168,255)" , "rgba(90,120,188,255)" , "rgba(240,128,0,255)" , "rgba(255,255,255,225", 45));
    }

    onClick(x, y, buttons){
        super.onClick(x, y, buttons);
        for (let j = 0; j < this.Mbut.length; j++) {
            this.Mbut[j].checkClick(this.mouse);
        }    
    }

    onMove(x, y) {
        super.onMove(x, y);
        for (let j = 0; j < this.Mbut.length; j++) {
            this.Mbut[j].checkHover(x, y);
        }    
    }

    update(){
        // console.log(this.ticks);
        this.ticks++;
    }

    draw(){
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.save();
        
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        ctx.restore();
        
        for (let j = 0; j < this.Mbut.length; j++) {
            this.Mbut[j].draw();
        }       
        
        ctx.restore();
      
    }
}

