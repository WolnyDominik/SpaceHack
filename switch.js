const switchType = {
    KEYSOCKET: 0,
    BUTTON: 1,
    KEY: 2
};
var switchTiles = new Image();
switchTiles.src = "/src/switch.png";
class Switch {
    constructor(x,y,type,callback) {
        this.x = x;
        this.y = y;
        this.width = 32;
        this.height = 32;
        this.type = type;
        this.angle = 0;
        this.prevAngle = 0;
        this.tmpAngle = 0;
        this.turning = false;
        this.size = {width: 32, height: 32};
    }
    update(){}
    draw() {
        ctx.save();
        ctx.translate(this.x+this.width/2,this.y+this.height/2);
        ctx.drawImage(switchTiles,0,0,32,32,-16,-16,32,32);
        ctx.rotate(this.angle);
        switch(this.type) {
            case 0:
                ctx.drawImage(switchTiles,32,0,32,32,-16,-16,32,32);
                break;
            case 1:
                if (this.angle == 90)
                    ctx.drawImage(switchTiles,0,32,32,32,-16,-16,32,32);
                break;
            case 2:
                ctx.drawImage(switchTiles,32,32,32,32,-16,-16,32,32);
                break;
        }
        ctx.restore();
    }
    onClick(mouse) {
        if (mouse.x >= this.x && mouse.x <= this.x+this.width && mouse.y >= this.y && mouse.y <= this.y+this.height) {
            if (this.type == switchType.BUTTON && (mouse.buttons&1)==1 && (mouse.prevButtons&1)==0) {
               this.angle = Math.PI/2;
            } else
            if (this.type == switchType.KEYSOCKET && (mouse.buttons&1)==1 && (mouse.prevButtons&1)==0) {
                this.type = switchType.KEY;
            } else
            if (this.type == switchType.KEY && (mouse.buttons&2)==2 && (mouse.prevButtons&2)==0) {
                this.type = switchType.KEYSOCKET;
            } else
            if (this.type == switchType.KEY && (mouse.buttons&1)==1 && (mouse.prevButtons&1)==0) {
                this.turning = true;
                let tmpX = this.x+this.height/2-mouse.x;
                let tmpY = this.y+this.width/2-mouse.y;
                this.tmpAngle = Math.atan2(tmpY,tmpX);
            }
        }
        if (this.turning && (mouse.buttons&1)==0 && (mouse.prevButtons&1)==1) {
            this.turning = false;
            this.prevAngle = this.angle;
        }
    }
    onMove(mouse) {
        if (this.turning) {
            let tmX = this.x+this.height/2-mouse.x;
            let tmY = this.y+this.width/2-mouse.y;
            let tmp = Math.atan2(tmY,tmX);
            
            if ((tmX*tmX+tmY*tmY) < 16) {
                this.turning = false;
                return;
            }
            
            this.angle = this.prevAngle+tmp-this.tmpAngle;
            this.angle %= Math.PI*2;
            if (this.angle<0) this.angle += Math.PI*2;
            
            console.log(this.angle);
            
            if (this.angle > Math.PI && this.angle < Math.PI*3/2) {
                this.turning = false;
            }
            
            if (this.angle>Math.PI/2 && this.angle<=Math.PI*5/4) this.angle = Math.PI/2;
            else if (this.angle > Math.PI*5/4) this.angle = 0;
            
            if (!this.turning) {
                this.prevAngle = this.angle;
            }
            /*if(this.angle >= Math.PI*3/2) this.angle = 0;
            else if(this.angle >= Math.PI) this.turning = false
            else if(this.angle >= Math.PI/2) this.angle = Math.PI*2;*/
        }
    }
    onKeyDown(key) {
    
    }
}