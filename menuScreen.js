class MenuScreen extends Screen {
    constructor() {
        super();
        this.ticks = 0;
        this.image = new Image();
        this.image.src = "/src/img/background.png";
        this.menuBtns = new Array();
        this.menuBtns.push(new Button(150, 150, 600, 55, "PLAY", "rgba(70,100,168,255)", "rgba(90,120,188,255)", "rgba(240,128,0,255)", "rgba(255,255,255,225", 40, () => {
            screenManager.pushScreen(gameScreen)
        }));
        this.menuBtns.push(new Button(150, 300, 600, 55, "OPTIONS", "rgba(70,100,168,255)", "rgba(90,120,188,255)", "rgba(240,128,0,255)", "rgba(255,255,255,225", 40, () => {
            this.activateContainer(0)
        }));
        this.focused = true;
        this.animate = true;
        this.velocity = 10;
        this.y = 720;
        this.alpha = 0;

        this.bckgrdAudio = new Audio("src/sound/title.mp3");
        this.bckgrdAudio.volume = 0.05;
        this.bckgrdAudio.loop = true;
        this.bckgrdAudio.play();
        
        this.containers = new Array();
        this.activeContainerId = 0;
        this.btns = new Array();
        this.btns.push(new Button(0, 0, 100, 55, "OK", "rgba(70,100,168,255)", "rgba(90,120,188,255)", "rgba(240,128,0,255)", "rgba(255,255,255,225", 40, () => {
            this.focus()
        }));
        this.containers.push(new Container(undefined, undefined, 500, 200, "rgba(255,100,255,255)", this.btns, () => {}));
    }

    onClick(x, y, buttons) {
        if (this.focused) {
            super.onClick(x, y, buttons);
            for (let j = 0; j < this.menuBtns.length; j++) {
                this.menuBtns[j].onClick(x, y, buttons);
            }
        }
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].onClick(x, y, buttons);
        }
    }

    onMove(x, y, buttons) {
        super.onMove(x, y);
        if (this.focused) {
            for (let j = 0; j < this.menuBtns.length; j++) {
                this.menuBtns[j].onMove(x, y);
            }
        }
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

    update() {
        this.ticks++;
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].update();
        }
        if(this.animate)
            this.y -= this.velocity;
            if(this.y <= 0)
                this.animate = false;
                this.alpha = 1;
            this.alpha = this.ticks/64;
    }

    activateContainer(i) {
        console.log("options");
        this.focused = false;
        this.containers[i].active = true;
        this.activeContainerId = i;
    }

    draw() {
        //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.drawImage(this.image, 0, 0, this.image.width, this.image.height, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
        ctx.restore();
        
        ctx.translate(0, this.y)
        for (let j = 0; j < this.menuBtns.length; j++) {
            this.menuBtns[j].draw();
        }
        if (this.containers[this.activeContainerId].active) {
            this.containers[this.activeContainerId].draw();
        }

        ctx.restore();

    }
}