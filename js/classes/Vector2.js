function Vector2 (x, y) {
    this.x = x;
    this.y = y;
}

Vector2.prototype.toString = function () {
    return this.x+","+this.y;
};