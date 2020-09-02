import React from 'react';

import {usePersistedState} from "../hooks/persisted-state";

import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { Marker } from '@react-google-maps/api';


const containerStyle = {
    width: '400px',
    height: '400px'
};

export default function ZooMap() {

    const [center, setCenter] = usePersistedState('center', {
        lat: 51.23925648995369,
        lng: 7.11062378150634421,
    });

    const [zoom, setZoom] = usePersistedState('zoom', 17);

    const [marker, setMarker] = usePersistedState('marker', {
        lat: 51.238741,
        lng: 7.107757
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

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects

        console.log(map)

    };

    const onLoad = React.useCallback(function callback(map) {
        console.log('onLoad')
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        console.log('onUnmount')
    }, [])

    return (

        <LoadScript
            googleMapsApiKey="AIzaSyDtIjAV_E5nOE691HilK34f1iRw_FF1NHI"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={zoom}
                onLoad={onLoad}
                onUnmount={onUnmount}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <Marker

                    position={marker}
                />
            </GoogleMap>
        </LoadScript>
    );

}