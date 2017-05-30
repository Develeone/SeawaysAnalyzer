function Map(center, zoom, size, canvas) {
    this.center = center;
    this.zoom = zoom;
    this.width = size;
    this.height = size;
    this.canvas = canvas;
}

Map.prototype.load = function(callback) {
    var self = this;

    var mapImage = new Image;
    mapImage.src = "http://maps.google.com/maps/api/staticmap" +
        "?center=" + this.center +
        "&zoom=" + this.zoom +
        "&size=" + this.width + "x" + this.height +
        "&style=element:labels|visibility:off" +
        "&style=feature:landscape|color:0xcbe6a3|visibility:on" +
        "&style=feature:water|color:0x77AAff|visibility:on" +
        "&maptype=satellite";

    mapImage.onload = function () {
        self.canvas.drawBackground(mapImage);

        if (callback)
            callback();
    }
};

Map.prototype.getCoordinateByPixel = function (targetVector2) {
    var scale = Math.pow(2, this.zoom);
    var mercator = new MercatorProjection();
    var centerPoint = mercator.fromCoordinateToPoint(this.center);

    var resultPoint = new Vector2(centerPoint.x + (targetVector2.x - this.width/2) / scale, centerPoint.y + (targetVector2.y - this.height/2) / scale);

    return mercator.fromPointToCoordinate(resultPoint);
};

Map.prototype.getPixelByCoordinate = function (targetCoordinate) {
    var scale = Math.pow(2, this.zoom);
    var mercator = new MercatorProjection();
    var centerPoint = mercator.fromCoordinateToPoint(this.center);
    var targetPoint = mercator.fromCoordinateToPoint(targetCoordinate);

    var targetX = ((targetPoint.x - centerPoint.x) * scale) + this.width/2;
    var targetY = ((targetPoint.y - centerPoint.y) * scale) + this.height/2;

    return new Vector2(targetX, targetY);
};

Map.prototype.drawPoint = function (targetVector2) {
    var canvas = this.canvas;
    canvas.drawPoint(targetVector2);
};

Map.prototype.getClickPoint = function (event) {
    var canvas = this.canvas;
    return canvas.getCursorPosition(event);
};

Map.prototype.save = function () {
    var canvas = this.canvas;
    window.location.href = canvas.toImage();
};