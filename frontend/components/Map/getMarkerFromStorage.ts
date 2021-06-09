import {PositionInterface} from "./Context/MapContext";

const markerDefault: PositionInterface = {
    lat: 51.238741,
    lng: 7.107757,
    isWithin: true,
    isGPS: false,
    text: 'Map Marker Text'
};

export const getMarkerFromStorage = (): PositionInterface => {

    const markerFromStorage = window.localStorage.getItem('position');

    const defaultMarker = {
        ...markerDefault
    };

    if(null === markerFromStorage){
        return defaultMarker;
    }

    let json = undefined;

    try {
        json = JSON.parse(markerFromStorage);
    } catch (e) {
        return defaultMarker;
    }

    if(!json.lat){
        return defaultMarker;
    }

    if(!json.lng){
        return defaultMarker;
    }

    return json as PositionInterface;

}