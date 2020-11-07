const pathType = {
    DEFAULT: 0,
    ELEVATOR: 1,
    WALL: 2
}
class PathNode {
    constructor(type, callback) {
        this.callback = callback;
        this.type = type || pathType.DEFAULT;
        this.color = "rgba("+(Math.random()*255)+","+(Math.random()*255)+","+(Math.random()*255)+",255)";
    }
    draw() {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillRect(-32,-64,64,128);
        ctx.restore();
    }
}