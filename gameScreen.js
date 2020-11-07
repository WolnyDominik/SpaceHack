class GameScreen extends Screen {
    constructor() {
        super();
        this.ticks = 0;
        this.image = new Image();
        this.image.src = "/src/img/background.png";
        
        this.path = new Path();
        this.path.addNode(0, 0, new PathNode(pathType.DEFAULT));
        this.path.addNode(1, 0, new PathNode(pathType.DEFAULT));
        this.path.addNode(2, 0, new PathNode(pathType.ELEVATOR));
        this.path.addNode(2, 1, new PathNode(pathType.ELEVATOR));
        this.path.addNode(3, 0, new PathNode(pathType.WALL));
        this.path.addNode(3, 1, new PathNode(pathType.ELEVATOR));
        this.path.addNode(4, 1, new PathNode(pathType.ELEVATOR));
        this.path.addNode(4, 0, new PathNode(pathType.ELEVATOR));
        this.containers = new Array();
    }

    update(){
        // console.log(this.ticks);
        this.ticks++;
        this.path.update(this.keyState);
    }
    
    onKeyDown(key) {
        super.onKeyDown(key);
        this.path.onKeyDown(key);
    }

    draw(){
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.save();
        
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, -canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        ctx.restore();
        
        this.path.draw();
        
        ctx.fillStyle = "#f00";
        let tmp = this.path.getPlayerPosition();
        ctx.fillRect(tmp.x-10,tmp.y-10,20,20);
        
        //ctx.fillRect(0,0,20,20);
        
        ctx.restore();
      
    }
}

