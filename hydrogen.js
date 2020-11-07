class Hydrogen {
    constructor(x, y, callback) {
        this.x = x;
        this.y = y;
        this.width = 128;
        this.height = 128;
        this.hydrogen = Math.floor(Math.random() * 101) / 100;
        this.oxygen = Math.floor(Math.random() * 101) / 100;
        this.nitrogen = Math.floor(Math.random() * 101) / 100;
        this.text = "level of:\n" + "hydrogen" + this.hydrogen + "\noxygen: " + this.oxygen + "\nnitrogen: " + this.nitrogen;
        this.lineheight = 25;
        this.lines =  this.text.split('\n');
        this.textcolor = "rgba(255,255,168,255)";
        this.fontsize = 20;
    }
    draw() {
        ctx.save();
        // ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.font = this.fontsize + "px 'Press Start 2P'";
        ctx.fillStyle = this.textcolor;
        ctx.textAlign = "center";
       // ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height);
        for (let i = 0; i <  this.lines.length; i++)
            ctx.fillText( this.lines[i],  this.x + this.width / 2,  this.y + (i *  this.lineheight));
        //  ctx.rotate(this.angle * Math.PI / 2);
        ctx.restore();
    }
    onClick(mouse) {
      //  console.log(this.hydrogen + " " + this.oxygen + " " + this.nitrogen);
    }
    onMove() {

    }
}