import React from 'react';

import { Map, TileLayer,    Marker, Popup,Polyline } from 'react-leaflet'
import {usePersistedState} from "../hooks/persisted-state";

export default function ZooMap() {

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

    return (

        <Map center={center} zoom={zoom} style={{
            width:"400px",
            height:"500px"
        }}
             onClick={onClick}
             onZoomend={onZoom}
             onMoveend={onMove}
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={marker}></Marker>

        </Map>

    );

}