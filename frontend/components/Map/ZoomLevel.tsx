import React from "react";

export const ZoomLevel = (props) => {

    const zoomLevelId = 'zoom-level';

    return <g id={zoomLevelId}>
        <text y={100}>Zoom {props.mapState.transform.k}</text>
    </g>;

};
