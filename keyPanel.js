var keyPanelTexture = new Image();
keyPanelTexture.src = "/src/keypad.png";
class KeyPanel {
    constructor(callback) {
        this.active = false;
        this.offset = {x: canvas.width/2, y: canvas.height/2};
        this.size = {width: 256, height: 288};
        this.background = "rgba(255,255,0,255)";
        this.switch = new Switch(52,148,switchType.KEYSOCKET,undefined);
        this.pressedKey = -1;
        this.keyList = "xxxx";
        this.code = ""+Math.floor(Math.random()*10)+""+Math.floor(Math.random()*10)+""+Math.floor(Math.random()*10)+""+Math.floor(Math.random()*10);
        this.fontsize = 35;
        this.callback = callback;
        this.ticks = 0;
    }
    draw(ticks) {
        ctx.save();
        
        ctx.translate(this.offset.x, this.offset.y);
        ctx.fillStyle = this.background;
        ctx.fillRect(-this.size.width/2, -this.size.height/2, this.size.width, this.size.height);
        //Draw background
        ctx.drawImage(keyPanelTexture,0,0,this.size.width,this.size.height,-this.size.width/2,-this.size.height/2,this.size.width,this.size.height);
        
        //Draw Key Switch relative to content
        ctx.translate(-this.size.width/2,-this.size.height/2);
        this.switch.draw();
        
        //Draw Pressed Keys
        if (this.pressedKey!=-1) {
            ctx.save();
            ctx.translate(104,104);
            console.log(this.pressedKey);
            ctx.drawImage(keyPanelTexture,360+((this.pressedKey%4)*32),104+(Math.floor(this.pressedKey/4)*32),32,32,((this.pressedKey%4)*32),(Math.floor(this.pressedKey/4)*32),32,32);
            ctx.restore();
        }
        
        //Draw Text
        if (this.switch.angle == Math.PI/2) {
            if (this.keyList != this.code) {
                
                //Blinking error
                if (ticks%30 > 15) {
                    ctx.drawImage(keyPanelTexture,288,112,16,16,32,112,16,16);
                }
                
                ctx.font=this.fontsize+"px 'Press Start 2P'";
                ctx.fillStyle = "#8487d5";
                ctx.textAlign = "left";
                ctx.fillText("ERR", 36, 76);
                this.code = ""+Math.floor(Math.random()*10)+""+Math.floor(Math.random()*10)+""+Math.floor(Math.random()*10)+""+Math.floor(Math.random()*10);
            } else {
                ctx.font=this.fontsize+"px 'Press Start 2P'";
                ctx.fillStyle = "#8487d5";
                ctx.textAlign = "left";
                ctx.fillText("OK", 36, 76);
            }
        } else {
            ctx.font=this.fontsize+"px 'Press Start 2P'";
            ctx.fillStyle = "#8487d5";
            ctx.textAlign = "left";
            ctx.fillText(":"+this.code, 36, 76);
        }
        
        ctx.restore();
    }
    update() {
        this.ticks += deltaTime;
        if (this.switch.angle != Math.PI/2 || this.code != this.keyList) {
            this.ticks = 0;
        }
        if (this.ticks > 2) {
            screenManager.screenstack[0].focus();
        }
    }
    onMove(mouse) {
        let ms = {x: mouse.x-this.offset.x+this.size.width/2, y: mouse.y-this.offset.y+this.size.height/2, buttons: mouse.buttons, prevButtons: mouse.prevButtons};
        this.switch.onMove(ms);
    }

    onClick(mouse) {
        let ms = {x: mouse.x-this.offset.x+this.size.width/2, y: mouse.y-this.offset.y+this.size.height/2, buttons: mouse.buttons, prevButtons: mouse.prevButtons};
        console.log(ms);
        this.switch.onClick(ms);
        
        if (ms.x-104>=0 && ms.x-104<=128 && ms.y-104>=0 && ms.y-104<=128 && (ms.buttons&1)==1 && (ms.prevButtons&1)==0) {
            const keypadValues = [1,2,3,'A',4,5,6,'B',7,8,9,'C','*',0,'#','D'];
            this.pressedKey = Math.floor((ms.x-104)/32)+4*Math.floor((ms.y-104)/32);
            this.keyList += ""+keypadValues[this.pressedKey];
            this.keyList = this.keyList.substr(1);
        } else if ((ms.buttons&1)==0) {
            this.pressedKey = -1;
        }
    }
    onKeyDown(key) {
        
    }
}