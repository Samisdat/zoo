import React from 'react';
import {useMap} from './Context/MapContext';

export const ZoomLevel = () => {

    const {
        state: {transform},
    } = useMap()

    return (
        <text y={100}>Zoom {transform.k}</text>
    );

};
