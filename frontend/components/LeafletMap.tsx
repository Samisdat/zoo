import React from 'react';

import { Map, TileLayer,    Marker, ImageOverlay, Polyline } from 'react-leaflet'
import {usePersistedState} from "../hooks/persisted-state";

export default function ZooMap(props) {

    console.log(props)

    const [center, setCenter] = usePersistedState('center', {
        lat: 51.23925648995369,
        lng: 7.11062378150634421,
    });

    const [zoom, setZoom] = usePersistedState('zoom', 17);

    const [marker, setMarker] = usePersistedState('marker', {
        lat: 51.23943863918227,
        lng: 7.111485600471497
    });

    const onClick = (event:any) => {

        const { lat, lng } = event.latlng;

        setMarker({
            lat,
            lng,
        });

    };

    const onZoom = (event:any) => {

        setZoom(event.target._zoom);

    };

    const onMove = (event:any) => {

        const { lat, lng } = event.target.getCenter()

        setCenter({
            lat,
            lng,
        });

    };

    let key = 0;

    let mysteriosLng = 7.110321521759034 - 7.108728
    let mysteriosLat = 51.240815597945485 - 51.24077

    console.log(props.buildingsGeoJson)

    const polygons = props.buildingsGeoJson.features.map( (feature)=>{

        key += 1;

        return {
            key: 'key' + key,
            coordinate: feature.geometry.coordinates[0].map((coordinate)=>{
                return{
                    lng: coordinate[0] + 0.0011,
                    lat: coordinate[1] - 0.0002
                }
            })
        };
    });

    /**
        {polygons.map((polygon) => (
            <Polyline key={polygon.key} color="black" positions={polygon.coordinate}></Polyline>
        ))}
     */

    let bounds = {
        south: 51.236776961813064,
        west: 7.105611562728882,
        north: 51.24177020918754,
        east: 7.115809321403503
    };

    let boundsLeaftlet = [
        [bounds.north, bounds.west],
        [bounds.south, bounds.east]
    ];


    return (

        <Map center={center} zoom={zoom} maxZoom={20} style={{
            width:"800px",
            height:"800px"
        }}
             onClick={onClick}
             onZoomend={onZoom}
             onMoveend={onMove}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ImageOverlay
                url="http://127.0.0.1:8080/luftaufnahme.png"
                bounds={boundsLeaftlet}
                opacity="0.5"
            />

            <Marker position={marker}></Marker>


        </Map>



    );

}