function Coordinate (latitude, longitude) {
    this.latitude = latitude;
    this.longitude = longitude;
}

Coordinate.prototype.toString = function () {
    return this.latitude+","+this.longitude;
};