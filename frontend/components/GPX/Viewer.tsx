import React, {useEffect, useRef, useState} from 'react';
import {PositionInterface, PositionRawInterface, useMap} from "../Map/Context/MapContext";
import {getData, TrackPoint} from "./getData";

const gpxTrack = getData();

export const GPXViewer = () => {

    const {
        dispatch
    } = useMap()

    const [index, setIndex] = useState<number>(0);

    const gpxRef = useRef(null);

    const speed =

    useEffect(() => {

        const trackPoint:TrackPoint = gpxTrack[index];

        const position_raw: PositionRawInterface = {
            lat:trackPoint.lat,
            lng:trackPoint.lng,
            type: 'gpx',
            data: trackPoint
        };

        /*
        dispatch({
            type: 'SET_POSITION_RAW',
            position_raw
        });
        */
        const nextIndex = index + 1;

        if(gpxTrack.length === nextIndex){
            return;
        }
        return;
        const timeDiff = (gpxTrack[(index + 1)].time -  trackPoint.time)/2;

        setTimeout(()=>{
            setIndex( index + 1);
        }, timeDiff);

    },[index]);

    return (
        <g ref={gpxRef}></g>
    );
}