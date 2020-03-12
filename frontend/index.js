
let map;

const initMap = () => {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: {lat: 51.23925648995369, lng: 7.11062378150634421},
        mapTypeId: 'terrain'
    });

    map.addListener('center_changed', function() {
       console.log(map.center.lat(),map.center.lng(),);
    });

    return map;
}

const globalStore = {};
let active;

let mapPolygons = {

};
let mapMarkers = [];

const setMapOnAll =  () => {

    for(const mapPolygonId in mapPolygons){
        mapPolygons[mapPolygonId].setMap(null);
    }

    for(const marker of mapMarkers){
        marker.setMap(null);
    }

    mapPolygons = {};
    mapMarkers = []

}

const plotPolygone = () =>{

    for(const polygonId in globalStore){

        const polygon = globalStore[polygonId];

        let opacity = 0.2;

        if(active === polygon.id){
            opacity = 1;
        }
        console.log(opacity)

        mapPolygons[polygon.id] = new google.maps.Polyline({
            path: polygon.coordinate,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: opacity,
            strokeWeight: 3,
            /*editable: true,*/
        });


        const marker = new google.maps.Marker({
            position: polygon.coordinate[0],
            map: map,
            title: polygon.name,
            data:polygon.id
        });
        marker.addListener('click', (marker) => {

            active = polygon.id;
            setMapOnAll(null)
            plotPolygone();

        });

        mapMarkers.push(marker);

        mapPolygons[polygon.id].setMap(map);

    }

};

const setActive = (newAcive) => {
    if(undefined !== active){
        document.getElementById(active).classList.remove('active')
    }

    active = newAcive;

    if(undefined !== active){
        document.getElementById(active).classList.add('active')

    }
}

const on = (elSelector, eventName, selector, fn) => {
    var element = document.querySelector(elSelector);

    element.addEventListener(eventName, function(event) {
        var possibleTargets = element.querySelectorAll(selector);
        var target = event.target;

        for (var i = 0, l = possibleTargets.length; i < l; i++) {
            var el = target;
            var p = possibleTargets[i];

            while(el && el !== element) {
                if (el === p) {
                    return fn.call(p, event);
                }

                el = el.parentNode;
            }
        }
    });
}

const listPolygone = (type, polygons) =>{

    const list = document.getElementById('list');

    for(const polygon of polygons) {

        const li = document.createElement('div');
        li.innerHTML = '<button class="highlight">' + polygon.name + '</button> <button class="delete">Delete</button>';
        li.setAttribute('id', polygon.id);
        list.append(li)

        if(undefined === active){
            setActive(polygon.id);
        }

        globalStore[polygon.id] = polygon;

    }


    plotPolygone();

    on('#list', 'click','.highlight',   (evt)=>{

        const target = evt.target.parentElement;

        const id = target.getAttribute('id');

        setMapOnAll();
        setActive(id);
        plotPolygone();

    })

    on('#list', 'click','.delete',   (evt)=>{

        const target = evt.target.parentElement;

        const id = target.getAttribute('id');

        deletePolygon(id)

        delete globalStore[id];

        setMapOnAll();
        setActive(id);
        plotPolygone();



    })

};

const loadPolygon = (type) => {

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'http://127.0.0.1:3000/polygon/' + type, false);
    xhr.onload = function(responseText) {

        const polygons = JSON.parse(this.responseText);

        listPolygone(type, polygons);

    }
    xhr.onerror = function() {
        console.log('Error ' + this.status);
    }
    xhr.send();


};

const deletePolygon = (id) => {

    var xhr = new XMLHttpRequest();

    xhr.open('DELETE', 'http://127.0.0.1:3000/polygon/' + id, false);
    xhr.onload = (responseText) => {


    }
    xhr.onerror = function() {
        console.log('Error ' + this.status);
    }
    xhr.send();


};

const start = () => {

    initMap();

    loadPolygon('way');

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
