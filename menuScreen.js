class MenuScreen extends Screen {
    constructor() {
        super();
        this.ticks = 0;
        this.image = new Image();
        this.image.src = "/src/background.png";
        this.menuBtns = new Array();
        this.menuBtns.push(new Button(150, 150, 600, 55, "PLAY" , "rgba(70,100,168,255)" , "rgba(90,120,188,255)" , "rgba(240,128,0,255)" , "rgba(255,255,255,225", 40, ()=>{screenManager.pushScreen(gameScreen)}));
        this.menuBtns.push(new Button(150, 300, 600, 55, "OPTIONS" , "rgba(70,100,168,255)" , "rgba(90,120,188,255)" , "rgba(240,128,0,255)" , "rgba(255,255,255,225", 40, ()=>{this.activateContainer(0)}));
        this.focused = true;
        
        this.containers = new Array();
        this.btns = new Array();
        this.btns.push(new Button(0, 0, 100, 55, "OK" , "rgba(70,100,168,255)" , "rgba(90,120,188,255)" , "rgba(240,128,0,255)" , "rgba(255,255,255,225", 40, ()=>{this.focus()}));
        this.containers.push(new Container(undefined, undefined, 500, 200, "rgba(255,100,255,255)", this.btns, ()=>{}));
    }

    onClick(x, y, buttons){
        if(this.focused){
            super.onClick(x, y, buttons);
            for (let j = 0; j < this.menuBtns.length; j++) {
                this.menuBtns[j].onClick(x, y, buttons);
            }
        }
        for (let j = 0; j < this.containers.length; j++) {
            if (this.containers[j].active) {
                this.containers[j].onClick(x, y, buttons);
            }
        }
    }

    onMove(x, y, buttons) {
        super.onMove(x, y);
        if(this.focused){
            for (let j = 0; j < this.menuBtns.length; j++) {
                this.menuBtns[j].onMove(x, y);
            }
        }
        for (let j = 0; j < this.containers.length; j++) {
            if (this.containers[j].active) {
                this.containers[j].onMove(x, y, buttons);
            }
        }
    }

    focus() {
        this.focused = true;
        for (let j = 0; j < this.containers.length; j++) {
            this.containers[j].active = false;
        }
    }

    update(){
        this.ticks++;
        for (let j = 0; j < this.containers.length; j++) {
            if (this.containers[j].active) {
                this.containers[j].update();
            }
        }
    }

    activateContainer(i) {
        console.log("options"); 
        this.focused = false; 
        this.containers[i].active = true;
    }

    draw(){
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.save();
        
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        ctx.restore();
        
        for (let j = 0; j < this.menuBtns.length; j++) {
            this.menuBtns[j].draw();
        }

        for (let j = 0; j < this.containers.length; j++) {
            if (this.containers[j].active) {
                this.containers[j].draw();
            }
        }
        
        ctx.restore();
      
    }
}

