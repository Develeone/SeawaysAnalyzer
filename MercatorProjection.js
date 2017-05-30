var MERCATOR_RANGE = 256;

function degreesToRadians(deg) {
    return deg * (Math.PI / 180);
}

function radiansToDegrees(rad) {
    return rad / (Math.PI / 180);
}

function bound(value, opt_min, opt_max) {
    if (opt_min != null) value = Math.max(value, opt_min);
    if (opt_max != null) value = Math.min(value, opt_max);
    return value;
}

function MercatorProjection () {
    this.pixelOrigin_ = new Vector2( MERCATOR_RANGE / 2, MERCATOR_RANGE / 2);
    this.pixelsPerLonDegree_ = MERCATOR_RANGE / 360;
    this.pixelsPerLonRadian_ = MERCATOR_RANGE / (2 * Math.PI);
}

MercatorProjection.prototype.fromCoordinateToPoint = function (latLng, opt_point) {
    var point = opt_point ? opt_point : new Vector2(0,0);

    var origin = this.pixelOrigin_;

    point.x = origin.x + latLng.longitude * this.pixelsPerLonDegree_;

    var siny = bound(Math.sin(degreesToRadians(latLng.latitude)), -0.9999, 0.9999);
    point.y = origin.y + 0.5 * Math.log((1 + siny) / (1 - siny)) * -this.pixelsPerLonRadian_;
    return point;
};

MercatorProjection.prototype.fromPointToCoordinate = function (point) {
    var origin = this.pixelOrigin_;
    var lng = (point.x - origin.x) / this.pixelsPerLonDegree_;
    var latRadians = (point.y - origin.y) / -this.pixelsPerLonRadian_;
    var lat = radiansToDegrees(2 * Math.atan(Math.exp(latRadians)) - Math.PI / 2);
    return new Coordinate(lat, lng);
};

    //pixelCoordinate = worldCoordinate * pow(2,zoomLevel)
//}