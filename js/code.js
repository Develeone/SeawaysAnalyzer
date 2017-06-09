var map;
var tracks = [];

$(document).ready(function(){
    $("#rerender-button").click(function () {
        startMap(onMapLoaded);
    });

    $("#save-button").click(function () {
        map.save();
    });

    startMap();
});

function startMap (callback) {
    var mapCanvas = new Canvas();

    var mapCenterLatitude = $("#map-center-latitude").val();
    var mapCenterLongitude = $("#map-center-longitude").val();

    var mapCenter = new Coordinate(mapCenterLatitude, mapCenterLongitude);//(40.903, 140.789);
    var mapZoom = $("#map-size").val();
    var mapSize = 640;

    map = new Map(mapCenter, mapZoom, mapSize, mapCanvas);

    document.getElementById("canvas").onmouseup = function(event) {
        var clickPoint = map.getClickPoint(event);
        var clickCoordinate = map.getCoordinateByPixel(clickPoint);

        $("#map-center-latitude").val(clickCoordinate.latitude);
        $("#map-center-longitude").val(clickCoordinate.longitude);
        $("#map-size").val(parseInt($("#map-size").val()) + (event.which == 3 ? -1 : 1));

        startMap(callback);
    };

    document.getElementById("canvas").addEventListener('contextmenu', function (event) {event.preventDefault();});

    return map.load(callback);
}

function onMapLoaded() {
    readTracksFile();
}

function readTracksFile() {
    var file = $("#input-tracks")[0].files[0];

    if (file) {
        var reader = new FileReader();

        reader.onload = function(e) {
            var contents = e.target.result;

            if (file.type != "text/csv") {
                alert("Ошибка!\nВходные данные должны быть в формате CSV!");
                return;
            }

            tracks = parseTracks(contents);

            renderDangerZones();
        };
        reader.readAsText(file);
    }
}

function parseTracks(data) {
    data = data.replace(new RegExp("\"", 'g'), '');

    var lines = data.split("\n");
    lines.shift();

    var tracks = [];

    for (var i = 0; i < lines.length; i++) {
        var trackData = lines[i].split(";");

        if (trackData.length < 8)
            continue;

        var track_id    = parseInt(trackData[0]);
        var marine_id   = parseInt(trackData[1]);
        var latitude    = parseFloat(trackData[2].replace(",", "."));
        var longitude   = parseFloat(trackData[3].replace(",", "."));
        var speed       = parseInt(trackData[4]);
        var course      = parseInt(trackData[5]);
        var age         = parseInt(trackData[6]);
        var time        = trackData[7];

        var coordinate = new Coordinate(latitude, longitude);

        var track = new Track(track_id, marine_id, coordinate, speed, course, age, time);

        tracks.push(track);
    }

    return tracks;
}

function renderDangerZones() {
    tracks.forEach(function (track) {
        var mapPX = map.getPixelByCoordinate(track.coordinate);
        map.drawPoint(mapPX);
    });
}