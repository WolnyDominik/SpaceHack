class MenuScreen extends Screen {
    constructor() {
        super();
        this.ticks = 0;
        this.image = new Image();
        this.image.src = "/src/menu0.png";
        
        this.lander = new Image();
        this.lander.src = "/src/menu1.png";
        
        this.fire1 = new Image();
        this.fire1.src = "/src/menu2.png";
        
        this.fire2 = new Image();
        this.fire2.src = "src/menu3.png";
        
        this.menuBtns = new Array();
        this.creds = new Container(undefined, undefined, 900, 600, "rgba(128,128,128,255)",0, [ new Creds ( () => {this.focus()}, 0 ) ], () => {})
        this.player = new Container(undefined, undefined, 1100, 350, "rgba(128,128,128,255)",0, [ new ChoosePlayer ( () => {this.focus()} ) ], () => {})
        this.focused = true;
        this.menuBtns.push(new Button(150, 100, 600, 55, "PLAY", "rgba(70,100,168,255)", "rgba(90,120,188,255)", "rgba(240,128,0,255)", "rgba(255,255,255,225", 40, () => {
            screenManager.pushScreen(new GameScreen())
        }));
        this.menuBtns.push(new Button(150, 200, 600, 55, "CHOOSE PLAYER", "rgba(70,100,168,255)", "rgba(90,120,188,255)", "rgba(240,128,0,255)", "rgba(255,255,255,225", 40, () => {
            this.player.active = true;
            this.focused = false;
        }));
        this.menuBtns.push(new Button(150, 300, 600, 55, "CREDITS", "rgba(70,100,168,255)", "rgba(90,120,188,255)", "rgba(240,128,0,255)", "rgba(255,255,255,225", 40, () => {
            this.focused = false;
            this.creds.active = true;
        }));

        this.animate = true;
        this.velocity = 10;
        this.y = 720;
        this.alpha = 0;

        this.bckgrdAudio = new Audio("src/sound/title.mp3");
        this.bckgrdAudio.volume = 0.05;
        this.bckgrdAudio.loop = true;
        this.bckgrdAudio.play();
    }

    onClick(x, y, buttons) {
        super.onClick(x, y, buttons);
        if (this.focused)
            for (let j = 0; j < this.menuBtns.length; j++)
                this.menuBtns[j].onClick(this.mouse);
        else if (this.player.active)
            this.player.onClick(this.mouse);
            
    }

    onKeyDown(key) {
        super.onKeyDown(key);
        if (!this.focused)
            this.creds.onKeyDown(key);
    }

    focus() {
        this.focused = true;
        this.creds.active = false;
        this.player.active = false;
    }

    onMove(x, y, buttons) {
        super.onMove(x, y);
        if (this.focused)
            for (let j = 0; j < this.menuBtns.length; j++)
                this.menuBtns[j].onMove(this.mouse);
    }

    update() {
        this.ticks+=deltaTime*60;
        if(this.animate)
            this.y -= this.velocity;
            if(this.y <= 0)
                this.animate = false;
                this.alpha = 1;
            this.alpha = this.ticks/64;
        if (!this.focused)
            this.creds.update();
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        
        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        ctx.drawImage(this.image,0,0,this.image.width,this.image.height,-canvas.width/2,-canvas.height/2,canvas.width,canvas.height);
        
        ctx.drawImage(this.lander,0,0,this.lander.width,this.lander.height,-canvas.width/2,-canvas.height/2+Math.sin(this.ticks/4),canvas.width,canvas.height);
        if (this.ticks%16>8) ctx.drawImage(this.fire1,0,0,this.fire1.width,this.fire1.height,-canvas.width/2,-canvas.height/2+Math.sin(this.ticks/4),canvas.width,canvas.height);
        else ctx.drawImage(this.fire2,0,0,this.fire2.width,this.fire2.height,-canvas.width/2,-canvas.height/2+Math.sin(this.ticks/4),canvas.width,canvas.height);
        
        ctx.restore();
        
        ctx.translate(0, this.y)
        for (let j = 0; j < this.menuBtns.length; j++) {
            this.menuBtns[j].draw();
        }

        if (!this.focused && this.creds.active)
            this.creds.draw();
        if (!this.focused && this.player.active)
            this.player.draw();
        ctx.restore();

    }
}