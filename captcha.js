class Captcha {
    constructor(callback) {
        this.model=null;
        this.input=null;
        this.image = new Image();
        this.x = 0;
        this.y = 0;
        this.width = 280;
        this.height = 280;
        this.callback = callback;
        this.done = false;
        this.ctxclicked = false;
        this.btnclicked = false;
        this.posX,this.posY;
        this.img=new ImageData(280,280);
        this.imgs=new ImageData(28,28);
        this.butx=290;
        this.buty=260;
        this.butwidth=30;
        this.butheight=30;
        for (let i = 0; i < this.img.data.length; i+=4) {
            this.img.data[i] = 0;
            this.img.data[i+1] = 0;
            this.img.data[i+2] = 0;
            this.img.data[i+3] = 255;
        }
        console.log(this.img);
       
        
    }
    predict(){
        this.input = tf.browser.fromPixels(this.imgs, 1).toFloat().reshape([1, 28, 28, 1]);
       
            
            console.log(this.input.arraySync().toString());
            
            const predictions = model.predict(this.input).arraySync();
            let res = [];
            for (let pred of predictions) {
                let maxi = 0;
                for (let i = 1; i < pred.length; i++) {
                    console.log(i, pred[i]);
                    if (pred[maxi] < pred[i]) {
                        maxi = i;
                    }
                }
                res.push(maxi);
            }
            return res;
    }
    update() {
        if (this.done) {
            if (this.callback && this.tick >= 120) {
                this.done = false;
                this.callback();
            }
        }
    }

    onClick(mouse) {
        if (mouse.x > this.x &&
            mouse.x < this.x + this.width &&
            mouse.y > this.y &&
            mouse.y < this.y + this.height &&
            (mouse.buttons&1) == 1) {
            this.ctxclicked=true;
        }
        else if(mouse.x > this.butx &&
            mouse.x < this.butx + this.butwidth &&
            mouse.y > this.buty &&
            mouse.y < this.buty + this.butheight &&
            (mouse.buttons&1) == 1) {
            console.log("SPIERDALAJ");
            this.butclicked=true;
        }
        else if((mouse.buttons&1)==0){
            this.ctxclicked=false;
            this.butclicked=false;

        }
    }

    onMove(mouse) {
        this.posX=mouse.x;
        this.posY=mouse.y;

    }
    onKeyDown(key) {

    }
    draw() {
        ctx.putImageData(this.img,this.x,this.y);
        if(this.ctxclicked){
            ctx.save()
            ctx.beginPath();
            ctx.lineWidth = 280 / 12;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'white';
            ctx.moveTo(this.posX, this.posY); 
            ctx.lineTo(this.posX, this.posY); 
            ctx.stroke(); 
            ctx.restore()
        }
        this.img=ctx.getImageData(this.x,this.y,this.width,this.height)
        ctx.fillStyle="red";
        ctx.fillRect(this.butx,this.buty,this.butwidth,this.butheight);
        if(this.butclicked){
            this.buttonclicked=false;
            ctx.drawImage(canvas, this.x, this.y,this.width, this.height, 0, 0, 28, 28);
            this.imgs = ctx.getImageData(0,0,28,28);
            this.predict()
        }
        
        if (!this.done) {
            ctx.save();
            ctx.fillStyle = "white";
            ctx.restore();

        } else {
            ctx.font = "42px 'Press Start 2P'";
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.fillText(" DONE !!!", this.x + this.width / 2, this.y + this.height / 2);
        }
        
    }
}