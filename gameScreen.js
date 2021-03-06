class GameScreen extends Screen {
    constructor() {
        super();
        this.ticks = 0;
        this.image = new Image();
        this.image.src = "/src/img/background.png";
        this.focused = true;
        this.activeContainerId = 0;
        this.path = new Path();
        this.escblck = false;
        this.parallax = new Parallax();

        this.containers = new Array();
        this.content= new Array();
        this.finish = new Container(undefined, undefined, 1000, 500, "rgba(128,128,128,255)",0, [ new Creds ( () => {this.focus(); screenManager.popScreen();}, 1 ) ], () => {});
        this.containers.push(new KeyPanel(this.focus));
        this.containers.push(new Container(undefined, undefined, 800, 400, "rgba(128,128,128,255)",1, [new OreBreaker(() => {this.focus()})], () => {}));
        this.containers.push(new Container(undefined, undefined, 800, 400, "rgba(3,6,120,255)",1, [new Hydrogen(0,0,() => {this.focus()})]));
        this.containers.push(new Container(undefined, undefined, 800, 400, "rgba(3,6,120,255)",1, [new Captcha(0,0,() => {this.focus()})]));
        this.containers.push(new Container(undefined, undefined, 400, 280, "rgba(128,128,128,255)",0, [
            new Button(0, -50, 300, 70, "RESUME", "rgba(70,100,168,255)", "rgba(90,120,188,255)", "rgba(240,128,0,255)", "rgba(255,255,255,225", 40, () => {
                this.focus();
            }),
            new Button(0, 50, 300, 70, "EXIT", "rgba(70,100,168,255)", "rgba(90,120,188,255)", "rgba(240,128,0,255)", "rgba(255,255,255,225", 40, () => {
                this.focus();
                screenManager.popScreen();
            })
        ]));
        this.nodeType=[
            [0,0,0,2,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,2,0,0],
            [0,2,1,0,0,0,0,0,1,0,0,0,0,0,0,1,0,2,1,0,2,0],
            [0,2,1,0,0,0,2,0,1,0,0,2,0,0,0,1,0,0,0,0,2,0],
            [0,2,1,0,0,0,2,2,1,0,0,0,2,0,0,0,0,0,0,0,0,0]]

        this.nodeMachine=[
            [-1,-1,-1,-1,-1,-1,-1,-1,5,-1,-1,-1,-1,-1,-1,-1,-1,-1, 5,-1,-1,-1],
            [-1,-1, 5,-1,-1,-1,-1,-1,5,-1,-1,-1,-1,-1,-1, 5,-1,-1, 5,69,-1,-1],
            [-1,-1, 5,-1,-1,-1,-1,-1,5,-1,-1,-1,-1,72,-1, 5,-1,-1,-1,-1,-1,-1],
            [-1,-1, 5,-1,-1,70,-1,-1,5,-1,-1,71,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]]
        
        this.nodeTexture=[
            [197,197,197,196,192,193,192+32,195,194,194,  194, 195,  192,193,193,193,192+32,194,194,196+32,   197,  197],
            [133, 64, 66, 66, 66, 67,   130,130,130,130,  130, 131,    2,  2,  2,  2,     2,132, 66,    66, 64+32,  133],
            [133,128,130,130,130,130,    68,  2,  2,  2,    2, 132,   66, 66, 66, 66, 67,   130,130,   130,128+32, 133],
            [133,  0,  2,  2,  2,  2,   0+32, 64, 66, 66,  66,  66,64+32,133,133,133,   133,133,133,   133,   133, 133]];
        
        this.nodeTask=[
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 2,-1,-1],
            [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1, 3,-1,-1,-1,-1,-1,-1,-1,-1],
            [-1,-1,-1,-1,-1, 0,-1,-1,-1,-1,-1, 1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]];
        
        console.log(this.containers);

        for(let i in this.nodeType){
            for (let j in this.nodeType[i]){
                this.path.addNode(j,i,new PathNode(this.nodeType[i][j],this.nodeTexture[i][j],this.nodeMachine[i][j],this.nodeTask[i][j]>=0?()=>{
                    var task = this.nodeTask[i][j];
                    console.log("ZADANIE ", task);
                    if (task == 1)
                        if (!this.containers[task].content[0].done){
                            this.focused = false;
                            this.containers[task].active = true;
                            this.activeContainerId = task;        
                        }
                    this.focused = false;
                    this.containers[task].active = true;
                    this.activeContainerId = task;
                }:""));
            }
        }
        
        this.path.setNodePosition(4,0);
        this.player = new Player();
    }

    update() {
        this.ticks += deltaTime*60;
        console.log(finishedTasks);
        if (this.focused) {
            this.path.update(this.keyState);
            this.player.update(this.keyState);
            this.parallax.update(this.path.getPlayerPosition());
        } else {
            this.player.update([]);
        }
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].update(this.ticks);
        }
        if(this.focused && finishedTasks >= 4) {
            this.focused = false;
            this.finish.active = true;
        }
    }

    onKeyDown(key) {
        if (!this.focused && !this.escblck)
            if (key == 27 && this.activeContainerId == 4){
                this.escblck = true;
                this.focus();
            }
        if (this.focused) {
            if (key == 27 && !this.escblck) {
                this.escblck = true;
                this.focused = false;
                this.containers[4].active = true;
                this.activeContainerId = 4;
            }
            this.path.onKeyDown(key, this.keyState)
        }
        else if(key==13 && !this.keyState[13] && !this.focused){
                this.focus();
        }
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].onKeyDown(key);
        }
        if (this.finish.active)
            this.finish.onKeyDown(key);
        super.onKeyDown(key)
    }

    onKeyUp(key) {
        super.onKeyUp(key);
        if (key == 27) {
            this.escblck = false;
        }
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
        ctx.save();

        ctx.save();
        ctx.fillStyle = "#000";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        //ctx.translate(canvas.width / 2, canvas.height / 2);
        //ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        ctx.translate(canvas.width/3*2, canvas.height/8);
        this.parallax.draw(this.ticks);
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
        
        ctx.restore();
        
        ctx.restore();
        
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].draw(this.ticks);
        }
        if (this.finish.active)
            this.finish.draw();

        ctx.restore();
    }
}