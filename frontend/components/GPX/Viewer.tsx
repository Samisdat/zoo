import React, {useEffect, useRef, useState} from 'react';
import {PositionInterface, PositionRawInterface, useMap} from "../Map/Context/MapContext";
import {getData, TrackPoint} from "./getData";

const gpxTrack = getData();

export const GPXViewer = () => {

    const {
        dispatch
    } = useMap()

    const [index, setIndex] = useState<number>(100);

    const gpxRef = useRef(null);

    useEffect(() => {

        return;

        const trackPoint:TrackPoint = gpxTrack[index];

        const position_raw: PositionRawInterface = {
            lat:trackPoint.lat,
            lng:trackPoint.lng,
            type: 'gpx',
            data: trackPoint
        };


        dispatch({
            type: 'SET_POSITION_RAW',
            position_raw
        });

        let nextIndex = index + 1;

        if(gpxTrack.length === nextIndex){
            nextIndex = 0;
        }

        setTimeout(()=>{
            setIndex( index + 1);
        }, 100);

    },[index]);

    return (
        <g ref={gpxRef}></g>
    );
}