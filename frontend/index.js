const initMap = () => {

    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: {lat: 51.23925648995369, lng: 7.11062378150634421},
        mapTypeId: 'terrain'
    });

    map.addListener('center_changed', function() {
       console.log(map.center.lat(),map.center.lng(),);
    });

    return map;
}

const addPolygone = (map, type, polygons) =>{

    for(const polygon of polygons){

        var buildingPoly = new google.maps.Polyline({
            path: polygon.coordinate,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            editable: true,
            fillColor: '#FF0000',
            fillOpacity: 0.35
        });

        buildingPoly.setMap(map);

        var marker = new google.maps.Marker({
            position: polygon.coordinate[0],
            map: map,
            title: polygon.name
        });
    }

};

const loadPolygon = (map, type) => {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://127.0.0.1:3000/' + type + '/gmap', false);
    xhr.onload = function(responseText) {

        console.log(responseText)

        const polygons = JSON.parse(this.responseText);

        addPolygone(map, type, polygons);

    }
    xhr.onerror = function() {
        console.log('Error ' + this.status);
    }
    xhr.send();


};

const start = () => {

    const map = initMap();

    loadPolygon(map, 'border');

};

window.start = start;

/*


        var xhr = new XMLHttpRequest();

        xhr.open('GET', ' http://127.0.0.1:3000/building/gmap', false);
        xhr.onload = function() {

          const buildings = JSON.parse(this.responseText);

          for(const building of buildings){

            var buildingPoly = new google.maps.Polyline({
              path: building.coordinate,
              geodesic: true,
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2,
              editable: true
            });

            buildingPoly.setMap(map);

            var marker = new google.maps.Marker({
              position: building.coordinate[0],
              map: map,
              title: building.name
            });
          }

          }

        xhr.onerror = function() {
          console.log('Error ' + this.status);
        }
        xhr.send();




      }
*/
