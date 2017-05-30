function Canvas() {
    var canvasObject = $("#canvas");
    this.context   = $(canvasObject)[0].getContext("2d");
    this.width     = $(canvasObject).width();
    this.height    = $(canvasObject).height();
}

Canvas.prototype.clear = function () {
    this.context.clearRect(0, 0, this.width, this.height);
};

Canvas.prototype.drawBackground = function (image) {
    this.context.drawImage(image, 0, 0);
};