import React from "react";
import {useMap} from "./Context/MapContext";

export const ZoomLevel = () => {

    const {
        state: {transform},
    } = useMap()

    const zoomLevelId = 'zoom-level';

    return <g id={zoomLevelId}>
        <text y={100}>Zoom {transform.k}</text>
    </g>;

};
