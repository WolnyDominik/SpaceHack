class GameScreen extends Screen {
    constructor() {
        super();
        this.ticks = 0;
        this.image = new Image();
        this.image.src = "/src/img/background.png";
        this.focused = true;
        this.activeContainerId = 0;
        this.path = new Path();
        this.containers = new Array();
        this.containers.push(new Container(undefined, undefined, 500, 200, "rgba(255,100,255,255)", [new Switch(0,0,switchType.KEYSOCKET)], () => {}));
        this.nodeType=[[-1,-1,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,2,0],
        [2,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,2,1,0,2],
        [2,1,0,0,0,2,0,1,0,0,2,0,0,0,1,0,0,0,0,2],
        [2,1,0,0,0,2,0,1,0,2,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]]
        
        
        this.nodeTexture=[[ 0, 0,196,192,193,192+32,195,194,194,194,195,192,193,193,193,192+32,194,194,196+32,],
        [64,66,66,66,67,130,130,130,130,130,131,2,2,2,2,2,132,66,66,64+32],
        [64,66,66,66,66,4,130,130,130,130,4+32,66,66,66,66,67,130,130,130,128+32],
        [0,2,2,2,2,132,66,66,66,64+32, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];
        for(let i in this.nodeType){
            for (let j in this.nodeType[i]){
                console.log(i,j);
                if(this.nodeType[i][j] != -1)
                    this.path.addNode(j,i,new PathNode(this.nodeType[i][j],this.nodeTexture[i][j]));
            }
        }
        /*this.path.addNode(0, 0, new PathNode(pathType.DEFAULT,2));
        this.oreBreaker = new OreBreaker(() => {this.focus()});
        this.content = new Array();
        this.content.push()
        this.containers.push(new Container(undefined, undefined, 800, 400, "rgba(128,128,128,255)", [this.oreBreaker], () => {}));
        this.path.addNode(0, 0, new PathNode(pathType.DEFAULT,2));
        this.path.addNode(1, 0, new PathNode(pathType.DEFAULT,2));
        this.path.addNode(2, 0, new PathNode(pathType.ELEVATOR,2));
        this.path.addNode(2, 1, new PathNode(pathType.ELEVATOR,2));
        this.path.addNode(3, 0, new PathNode(pathType.WALL,1));
        this.path.addNode(3, 1, new PathNode(pathType.ELEVATOR,2));
        this.path.addNode(4, 1, new PathNode(pathType.ELEVATOR,2));
        this.path.addNode(4, 0, new PathNode(pathType.ELEVATOR,2, () => {
            this.focused = false;
            this.containers[0].active = true;
            this.activeContainerId = 0;
        }));*/
        this.path.setNodePosition(3,0);
        this.player = new Player();
    }

    update() {
        // console.log(this.ticks);
        this.ticks++;
        if (this.focused) {
            this.path.update(this.keyState);
            this.player.update(this.keyState);
        }
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].update();
        }
    }

    onKeyDown(key) {
        if (this.focused) 
            this.path.onKeyDown(key, this.keyState)
        if(key==13 && !this.keyState[13] && !this.focused){
                this.focus();
        }
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].onKeyDown(key);
        }
        this.keyState[key] = true;
    }
    

    onClick(x, y, buttons) {
        super.onClick(x,y,buttons);
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].onClick(this.mouse);
        }
    }
    onMove(x, y, buttons) {
        super.onMove(x,y,buttons);
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].onMove(this.mouse);
        }
    }

    focus() {
        this.focused = true;
        for (let j = 0; j < this.containers.length; j++) {
            this.containers[j].active = false;
        }
    }
    
    draw() {
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.save();

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        ctx.restore();
        
        ctx.save();

        let tmp = this.path.getPlayerPosition();
        ctx.translate(canvas.width/2,canvas.height/2);
        ctx.scale(6,6);
        ctx.translate(-tmp.x,-tmp.y-4);
        
        this.path.draw();
        
        ctx.save();
        ctx.translate(tmp.x-32,tmp.y);
        this.player.draw(this.ticks/3.4);
        //3.4
        ctx.restore();
        //ctx.fillStyle = "#f00";
        //ctx.fillRect(tmp.x - 10, tmp.y - 10, 20, 20);
        //ctx.fillRect(0,0,20,20);
        
        ctx.restore();
        
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].draw();
        }

        ctx.restore();
    }
}