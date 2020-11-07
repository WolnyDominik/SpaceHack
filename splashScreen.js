class SplashScreen extends Screen {
    constructor() {
        super();
        this.ticks = 0;
        this.image = new Image();
        this.image.src = "/src/img/logo.png";
        this.scale = 25;
        this.alpha = 1;
    }

    update() {
        this.ticks++;
        if(this.ticks > 75)
            if (this.alpha > 0) {
                this.alpha -= 1/26;
            } else {
                this.alpha = 0
            }
        if(this.ticks > 100)
            screenManager.pushScreen(menuScreen);
    }

    draw() {
        ctx.save();

        ctx.globalAlpha = this.alpha;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.drawImage(
            this.image, 0, 0, 
            this.image.width, this.image.height, 
            this.image.width * this.scale / 2, this.image.height * this.scale / 4, 
            this.image.width * this.scale, this.image.height * this.scale);
        ctx.restore();
    }
}