import {mapTransformDefault, MapTransformInterface} from "./Context/MapContext";

export const getTransformFromStorage = ():MapTransformInterface => {

    const zoomFromStorage = window.localStorage.getItem('transform');

    if(null === zoomFromStorage){
        return mapTransformDefault;
    }

    let json = undefined;

    try {
        json = JSON.parse(zoomFromStorage);
    } catch (e) {
        return mapTransformDefault;
    }

    if(undefined === json.x){
        return mapTransformDefault;
    }

    if(undefined === json.y){
        return mapTransformDefault;
    }

    if(undefined === json.y){
        return mapTransformDefault;
    }

    return json as MapTransformInterface;

}