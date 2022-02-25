import React, {useEffect, useRef} from 'react';
import {useMap} from "../Context/MapContext";
import * as d3 from "d3";
import {getPosition} from "./CartesianPoint";

export const GeoPoint = () => {

    const {
        state: {exchange, transform},
    } = useMap();

    const ref = useRef(null);

    useEffect(()=>{

        if(!exchange){
            return;
        }

        if(!exchange.position){
            return;
        }

        const {position} = exchange;

        const geo = d3.select('#geo').node() as SVGGraphicsElement;

        let localPos:any = getPosition(geo, position)

        d3.select(ref.current)
            .attr('cx', function(d) {
                return localPos.x;
            })
            .attr('cy', function(d) {
                return localPos.y;
            })
        ;


    }, [exchange])


    return (
        <circle
            ref={ref}
            r={30}
            fill={'blue'}
            opacity={0.5}
        />

    );

}
