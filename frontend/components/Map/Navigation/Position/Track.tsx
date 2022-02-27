import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {PositionInterface, useMap} from "../../Context/MapContext";
import {Route} from "../Routing/Graph/Dijkstra";

export const Track = () => {

    const {
        state: {position},
    } = useMap();

    const [track, setTrack] = React.useState<PositionInterface[]>([]);

    useEffect(() => {

        if(!position){
            return;
        }

        const len = track.length;

        if(
            0 < len &&
            track[len - 1].lat === position.lat &&
            track[len - 1].lng === position.lng
        ){

            return;

        }

        track.push(position)

        setTrack(track);

        //console.log(track);

    },[position]);

    return (
        <React.Fragment/>
    );
}
