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
        this.containers.push(new Container(undefined, undefined, 500, 200, "rgba(255,100,255,255)", [], () => {}));
        this.path.addNode(0, 0, new PathNode(pathType.DEFAULT,2));
        this.path.addNode(1, 0, new PathNode(pathType.DEFAULT,2));
        this.path.addNode(2, 0, new PathNode(pathType.ELEVATOR,2));
        this.path.addNode(2, 1, new PathNode(pathType.ELEVATOR,2));
        this.path.addNode(3, 0, new PathNode(pathType.WALL,1));
        this.path.addNode(3, 1, new PathNode(pathType.ELEVATOR,2));
        this.path.addNode(4, 1, new PathNode(pathType.ELEVATOR,2));
        this.path.addNode(4, 0, new PathNode(pathType.ELEVATOR,2, () => {
            console.log("options");
            this.focused = false;
            this.containers[0].active = true;
            this.activeContainerId = 0;
        }));
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
        if(key==13 && !this.keyState[13]){
            if (this.focused) {
                this.path.onKeyDown(key);
            } else {
                this.focus();
            }
        }
        this.keyState[key] = true;
    }

    onClick(x, y, buttons) {
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].onClick(x, y, buttons);
        }
    }
    onMove(x, y, buttons) {
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].onMove(x, y, buttons);
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