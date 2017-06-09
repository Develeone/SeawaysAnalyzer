function Canvas() {
    this.canvas    = $("#canvas");
    this.context   = $(this.canvas)[0].getContext("2d");
    this.width     = $(this.canvas).width();
    this.height    = $(this.canvas).height();
}

Canvas.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};

Canvas.prototype.drawBackground = function (image) {
    this.clear();
    this.context.drawImage(image, 0, 0);
};

Canvas.prototype.drawPoint = function (targetVector2) {
    // var brushSize = 10;
    // var brushBlurSize = 10;
    //
    // var r = brushSize + brushBlurSize;
    // var d = r * 2;
    // brushCanvas.width = d;
    // brushCanvas.height = d;

    var radius = 5;

    this.context.globalAlpha = 0.05;
    this.context.beginPath();
    this.context.arc(targetVector2.x, targetVector2.y, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = "#ff0000";
    this.context.fill();
    this.context.globalAlpha = 1;
};

Canvas.prototype.getCursorPosition = function (event) {
    var rect = this.canvas[0].getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    return new Vector2(x, y);
};

Canvas.prototype.toImage = function () {
    return this.canvas[0].toDataURL("image/png").replace("image/png", "image/octet-stream");
};