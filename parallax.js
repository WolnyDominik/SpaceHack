class Parallax {
    constructor() {
        this.textures = [
            loadTexture("/src/parallax/layer0.png"),
            loadTexture("/src/parallax/layer1.png"),
            loadTexture("/src/parallax/layer2.png"),
            loadTexture("/src/parallax/layer3.png"),
            loadTexture("/src/parallax/layer4.png"),
            loadTexture("/src/parallax/layer5.png"),
            loadTexture("/src/parallax/layer6.png"),
            loadTexture("/src/parallax/layer01.png")
        ];
        this.offset = {layer0: 0, layer1: 0, layer2: 0};
        this.speed = {layer0: 0, layer1: 0.5, layer2: 1};
        this.size = {width: 240, height: 135};
        this.scale = {x: 1280/240/4*2.5, y: 720/135/4*2.5};
    }
    update(pos) {
        this.offset.layer0 = -pos.x*this.speed.layer0;
        this.offset.layer1 = -pos.x*this.speed.layer1;
        this.offset.layer2 = -pos.x*this.speed.layer2;
    }
    draw(ticks) {
        ctx.save();
        
        ctx.save();
        ctx.translate(this.offset.layer0,0);
        ctx.scale(this.scale.x,this.scale.y);
        ctx.drawImage(this.textures[0],this.size.width,0);
        ctx.drawImage(this.textures[0],-this.size.width,0);
        ctx.drawImage(this.textures[0],-this.size.width*2,0);
        ctx.drawImage(this.textures[0],0,0);
        ctx.drawImage(this.textures[7],-this.size.width+80,0);
        ctx.restore();
        
        ctx.save();
        ctx.translate(this.offset.layer1,0);
        ctx.scale(this.scale.x,this.scale.y);
        ctx.drawImage(this.textures[1],this.size.width,0);
        ctx.drawImage(this.textures[1],-this.size.width,0);
        ctx.drawImage(this.textures[1],0,0);
        ctx.restore();
        
        ctx.save();
        ctx.translate(this.offset.layer2,0);
        ctx.scale(this.scale.x*4/3,this.scale.y);
        ctx.drawImage(this.textures[2],this.size.width,0);
        ctx.drawImage(this.textures[2],-this.size.width,0);
        ctx.drawImage(this.textures[2],0,0);
        ctx.drawImage(this.textures[2],this.size.width,33);
        ctx.drawImage(this.textures[2],-this.size.width,33);
        ctx.drawImage(this.textures[2],0,33);
        
        ctx.drawImage(this.textures[3],0,0);
        ctx.drawImage(this.textures[4],0,Math.sin(ticks/4));
        if (ticks%16>8) ctx.drawImage(this.textures[5],0,Math.sin(ticks/4));
        else ctx.drawImage(this.textures[6],0,Math.sin(ticks/4));
        ctx.restore();
        
        ctx.restore();
    }
}
function loadTexture(path) {
    let tmp = new Image();
    tmp.src = path;
    return tmp;
}