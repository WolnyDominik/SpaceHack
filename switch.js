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
        this.tmpAngle = 0;
        this.size = {width: 32, height: 32};
    }
    draw() {
        ctx.save();
        ctx.translate(this.x+this.width/2,this.y+this.height/2);
        ctx.drawImage(switchTiles,0,0,32,32,-16,-16,32,32);
        ctx.rotate(this.angle*Math.PI/2);
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
        if (this.type == switchType.BUTTON && (mouse.buttons&1)==1 && (mouse.prevButtons&1)==0) {
           this.angle = 90;
        }
        if (this.type == switchType.KEYSOCKET && (mouse.buttons&1)==1 && (mouse.prevButtons&1)==0) {
            this.type = 2;
        }
    }
    onMove() {
        
    }
    onKeyDown(key) {
    
    }
}