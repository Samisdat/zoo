import {PositionInterface} from './Context/MapContext';

const markerDefault: PositionInterface = {
    lat:51.24289490775235,
    lng:7.111594493243635,
    isWithin:false,
    isGPS:false,
    text:'außerhalb',
    edgeId:1428,
    x:861.438,
    y:309.839,
    raw:{
        lat:51.24098022488334,
        lng:7.107241601137138,
        type:'gpx',
        data:{
            lat:51.24098022488334,
            lng:7.107241601137138,
            time:0
        }
    }
};

export const getPositionFromStorage = (): PositionInterface => {

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

    if(!json.x){
        return defaultMarker;
    }

    if(!json.y){
        return defaultMarker;
    }

    return json as PositionInterface;

}