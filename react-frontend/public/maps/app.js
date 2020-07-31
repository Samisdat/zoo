// This example adds a red rectangle to a map.
function initMap() {
    
    const map = new google.maps.Map(document.getElementById("gmap"), {
        zoom: 17,
        center: {
            lat: 51.239352392207074,
            lng: 7.111075218524152
        },
        mapTypeId: "terrain"
    });
    const rectangle = new google.maps.Rectangle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.1,
        map,
        editable: true,
        bounds: {
            south: 51.236776961813064,
            west: 7.105611562728882,
            north: 51.24177020918754,
            east: 7.115809321403503
        }
    });

    google.maps.event.addListener(rectangle, 'bounds_changed', function() {
        console.log(rectangle.getBounds().toJSON());
    });
    google.maps.event.addListener(map, "dragend", function() {
        var center = map.getCenter().toJSON();

        console.log(center);

    });

}

var mymap = L.map('leaflet').setView([51.239352392207074, 7.111075218524152], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

// define rectangle geographical bounds
var bounds = [[51.236776961813064, 7.105611562728882], [51.24177020918754, 7.115809321403503]];
// create an orange rectangle
L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(mymap);
