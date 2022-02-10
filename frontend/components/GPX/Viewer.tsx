import React, {useEffect, useRef, useState} from 'react';
import {PositionInterface, useMap} from "../Map/Context/MapContext";
import {getData, TrackPoint} from "./getData";

const gpxTrack = getData();

export const GPXViewer = () => {

    const {
        state: {teaser},
        dispatch
    } = useMap()

    const [index, setIndex] = useState<number>(0);

    const gpxRef = useRef(null);

    useEffect(() => {

        const trackPoint:TrackPoint = gpxTrack[index];

        const newPosition: PositionInterface = {
            isGPS: false,
            isWithin: true,
            text: 'gpx',
            lat:trackPoint.lat,
            lng:trackPoint.lng
        };

        dispatch({
            type: 'SET_POSITION',
            position: newPosition
        });

        const nextIndex = index + 1;

        if(gpxTrack.length === nextIndex){
            return;
        }
        return;
        setTimeout(()=>{
            setIndex( index + 1);
        }, 50);

    },[index]);

    return (
        <g ref={gpxRef}></g>
    );
}