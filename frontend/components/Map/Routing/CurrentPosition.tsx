import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {useMap} from "../Context/MapContext";

export const CurrentPosition = () => {

    const {
        state: {position},
    } = useMap();

    const ref = useRef(null);

    useEffect(() => {

        if(!position || undefined === position.x || undefined === position.y){
            return;
        }

        let radius = 30;

        if(position.fuzziness && 30 < position.fuzziness){
            radius = position.fuzziness;
        }

        d3.select(ref.current)
            .attr('cx', function(d) {
                return position.x;
            })
            .attr('cy', function(d) {
                return position.y;
            })
            .attr('r', radius)
        ;

    },[position]);

    return (
        <circle
            ref={ref}
            fill={'yellow'}
        />
    );
}
