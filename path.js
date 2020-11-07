class Path {
    constructor() {
        this.nodeMap = [];
        this.position = {x: 0, y: 0};
        this.offset = {x: 0, y: 0};
        this.size = {width: 64, height: 128};
        this.speed = 200;
    }
    getPlayerPosition() {
        return {x: this.position.x*this.size.width+this.offset.x,
                y: this.position.y*this.size.height+this.offset.y};
    }
    setNodePosition(x,y) {
        this.position = {x: x, y: y};
    }
    setNodeOffset(x,y) {
        this.offset = {x: x, y: y};
    }
    addNode(x,y,pathNode) {
        if (!this.nodeMap[y]) this.nodeMap[y] = [];
        this.nodeMap[y][x] = pathNode;
    }
    onKeyDown(key) {
        if (key == 13 && this.nodeMap[this.position.y][this.position.x].callback)
            this.nodeMap[this.position.y][this.position.x].callback();
    }
    draw() {
        for (let y in screenManager.screenstack[0].path.nodeMap) {
            for (let x in screenManager.screenstack[0].path.nodeMap[y]) {
                ctx.save();
                ctx.translate(x*this.size.width,y*this.size.height);
                this.nodeMap[y][x].draw();
                ctx.restore();
            }
        }
    }
    update(keyState) {
        if (keyState[87] && this.nodeMap[this.position.y-1]) {
            if (this.nodeMap[this.position.y][this.position.x].type == pathType.ELEVATOR && this.nodeMap[this.position.y-1][this.position.x]) {
                if (this.nodeMap[this.position.y-1][this.position.x].type == pathType.ELEVATOR) {
                    this.position.y--;
                    this.offset = {x: 0, y: 0};
                }
            }
        }
        if (keyState[83] && this.nodeMap[this.position.y+1]) {
            if (this.nodeMap[this.position.y][this.position.x].type == pathType.ELEVATOR && this.nodeMap[this.position.y+1][this.position.x]) {
                if (this.nodeMap[this.position.y+1][this.position.x].type == pathType.ELEVATOR) {
                    this.position.y++;
                    this.offset = {x: 0, y: 0};
                }
            }
        }
        if (keyState[65]) {
            this.offset.x -= deltaTime*this.speed;
            if (this.offset.x < -this.size.width/2) {
                if (this.nodeMap[this.position.y][this.position.x-1] != undefined) {
                    if (this.nodeMap[this.position.y][this.position.x-1].type == pathType.WALL) {
                        this.offset.x = -this.size.width/2;
                        return;
                    }
                    this.position.x--;
                    this.offset.x += this.size.width;
                } else {
                    this.offset.x = -this.size.width/2;
                }
            }
        }
        if (keyState[68]) {
            this.offset.x += deltaTime*this.speed;
            if (this.offset.x > this.size.width/2) {
                
                if (this.nodeMap[this.position.y][this.position.x+1] != undefined) {
                    if (this.nodeMap[this.position.y][this.position.x+1].type == pathType.WALL) {
                        this.offset.x = this.size.width/2;
                        return;
                    }
                    this.position.x++;
                    this.offset.x -= this.size.width;
                } else {
                    this.offset.x = this.size.width/2;
                }
            }
        }
    }
}