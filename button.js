class Button{
    constructor(x,y,width,height,text,prim,sec,act,textcolor,fontsize,callback){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.text = text
        this.prim = prim
        this.sec = sec
        this.act = act
        this.textcolor = textcolor
        this.fontsize=fontsize
        this.activated = false
        this.hover = false
        this.callback = callback
    }

    draw(){
        ctx.save()
        
        //ctx.fillStyle = this.sec;
        ctx.fillStyle = "rgba(128,128,128,255)";
        ctx.fillRect(this.x - 3, this.y - 3, this.width, this.height);
        
        if (this.activated)
            ctx.fillStyle = this.act;
        else if (this.hover)
            ctx.fillStyle = this.sec;
        else
            ctx.fillStyle = this.prim;
        
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.font=this.fontsize+"px 'Press Start 2P'";
        ctx.fillStyle = this.textcolor;
        ctx.textAlign = "center";
        ctx.fillText(this.text ,this.x+this.width/2 ,this.y+this.height );
        
        ctx.restore()
    }

    checkClick(x, y, buttons){
        if (this.checkCoords(x, y) &&
            buttons&1 == 1
        ) {
            this.activated=true;
        }
        else {
            this.activated=false;
        }
    }

    checkCoords(x, y) {
        return (x > this.x && 
            x < this.x + this.width && 
            y > this.y && 
            y < this.y + this.height
        );
    }

    checkHover(x, y) {
        this.hover = this.checkCoords(x, y);
        if (!this.hover)
            this.activated = false;
    }
}