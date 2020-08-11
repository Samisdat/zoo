import React from 'react';

import {usePersistedState} from "../hooks/persisted-state";
import GoogleMapReact from 'google-map-react';
import {GoogleMapMarkers} from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects

        console.log(map)

    };

    const bootstrapURLKeys = { key: 'AIzaSyDtIjAV_E5nOE691HilK34f1iRw_FF1NHI' };

    return (

        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={bootstrapURLKeys}
                center={center}
                zoom={zoom}
                onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            >

            <AnyReactComponent
                lat={marker.lat}
                lng={marker.lng}
                text="hei   "
                style={{
                    opacity:0.5,
                    background:'red',
                    width: '20px',
                    height: '520x'
                }}
            />
            </GoogleMapReact>
        </div>



    );

}