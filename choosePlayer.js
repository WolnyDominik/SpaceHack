class ChoosePlayer {
    constructor(callback) {
        this.x = 0;
        this.y = 0;
        this.width = 0;
        this.height = 0;
        this.scale = 4;
        this.callback = callback;
        this.image = new Image();
        this.image.src = "/src/ziemniaczki.png";
    }

    draw() {
        ctx.save();
        
        ctx.translate(125, 210)

        ctx.drawImage(
            this.image, 0,0, 
            this.image.width, this.image.height, 
            0,0,
            this.image.width*this.scale, this.image.height*this.scale
        );

        ////       HITBOXES       \\\\
        
        // ctx.globalAlpha = 0.5;
        // ctx.fillStyle = "rgba(255,128,255,50)";
        // ctx.fillRect(0*64*this.scale+24,32,48*this.scale,60*this.scale);
        // ctx.fillRect(1*64*this.scale+24,32,48*this.scale,60*this.scale);
        // ctx.fillRect(2*64*this.scale+24,32,48*this.scale,60*this.scale);
        // ctx.fillRect(3*64*this.scale+24,32,48*this.scale,60*this.scale);

        ctx.restore();
    }

    checkCoords(x, y, n) {
        if (
            x > 125+n*64*this.scale+24 &&
            x < 125+n*64*this.scale+24+48*this.scale &&
            y > 210+32 &&
            y < 210+60*this.scale
        )
            return true;
    }

    onClick(mouse) {
        if (this.checkCoords(mouse.x, mouse.y, 0)) {
            playerName = "golonka";
            this.callback();
        } else if (this.checkCoords(mouse.x, mouse.y, 1)) {
            playerName = "doktor";
            this.callback();
        } else if (this.checkCoords(mouse.x, mouse.y, 2)) {
            playerName = "pyra";
            this.callback();
        } else if (this.checkCoords(mouse.x, mouse.y, 3)) {
            playerName = "bob";
            this.callback();
        }
    }
}