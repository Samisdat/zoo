import {PositionInterface} from "./Context/MapContext";

export const setMarkerToStorage = (position: PositionInterface)  => {

    const jsonString = JSON.stringify(position);

    window.localStorage.setItem('position', jsonString);


}