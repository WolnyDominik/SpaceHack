class Creds {
    constructor(callback, v = 0) {
        this.texts = [
            ["Title screen music:", "", "\"Title Screen\"", "by sawsqarenoise", "", "freemusicarchive.org", "(Creative Commons)"],
            ["", " GRATULACJE! ", "", "Udało Ci sie ukończyć gre!", "", "Wciśnij [ESC] by wyjść"]
        ];
        
        
        this.x = 0;
        this.y = 0;
        this.v = v;
        this.width = 0;
        this.height = 0;
        this.trans = 60;
        this.callback = callback;
    }

    draw() {
        ctx.save();

        ctx.font="36px 'Press Start 2P'";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        
        for(let i = 0; i<this.texts[this.v].length; i++) {
            ctx.fillText(this.texts[this.v][i], 640, 190);
            ctx.translate(0,this.trans);
        }

        ctx.restore();
    }

    update(){}
    onClick(mouse){}
    onMove(mouse){}
    onKeyDown(key){
        if (key == 27){
            if (this.callback) this.callback();
        }
    }
}