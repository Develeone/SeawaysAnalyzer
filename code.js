var map;

$(document).ready(function(){
    $("#input-data").change(function(){
        SendInputData();
    });

    StartMap();
});

function StartMap () {
    var mapCanvas = new Canvas();
    var mapCenter = new Coordinate(43.033074, 131.891255);
    var mapZoom = 15;
    var mapSize = 640;
    map = new Map(mapCenter, mapZoom, mapSize, mapCanvas);

    map.load();
}

function SendInputData() {
    var formData = new FormData(document.getElementById("input-data-form"));

    var r = new XMLHttpRequest();
    r.open("POST", 'backend.php');
    r.setRequestHeader("ContentType", 'multipart/form-data');
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            if (r.status != 200) {
                alert(r.responseText);
            } else {
                alert("OK! )")
            }
        }
    };
    r.send(formData);
}