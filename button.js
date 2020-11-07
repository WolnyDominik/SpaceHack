class Button{
    constructor(x,y,width,height,text,prim,sec,act,textcolor,fontsize){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.text = text
        this.prim = prim
        this.sec = sec
        this.act = act
        this.color = this.prim
        this.textcolor = textcolor
        this.fontsize=fontsize
        this.activated = false
    }

    draw(){
        ctx.save()
        
        ctx.fillStyle = this.sec;
        ctx.fillRect(this.x - 3, this.y - 3, this.width, this.height);
        ctx.fillStyle = this.color;
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
            this.color = this.act;
            this.activated=true;
        }
        else{
            this.activated=false;
            this.color = this.prim;
        }     
    }

    checkCoords(x, y) {
        if (x > this.x && 
            x < this.x + this.width && 
            y > this.y && 
            y < this.y + this.height
        ) {
            return true;
        }
        
        return false;
    }

    checkHover(x, y) {
        if(this.checkCoords(x, y) && !this.activated)
            this.color = this.sec;

        else 
            this.color = this.prim;
    }
}