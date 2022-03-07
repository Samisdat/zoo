import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {useMap} from "../../Context/MapContext";
import styled from "@mui/system/styled";

const Fuzziness = styled('circle')({
    fill: '00a800',
    opacity: 0.2
});

const Position = styled('circle')({
    fill: '#00a800',
    stroke: '#0A6001',
    strokeWidth: '3px',
});

export const CurrentPosition = () => {

    const {
        state: {position},
    } = useMap();

    const refFuzziness = useRef(null);
    const refPos = useRef(null);

    useEffect(() => {

        if(!position || undefined === position.x || undefined === position.y){
            return;
        }


        d3.select(refPos.current)
            .attr('cx', function(d) {
                return position.x;
            })
            .attr('cy', function(d) {
                return position.y;
            })
        ;

        d3.select(refFuzziness.current)
            .attr('cx', function(d) {
                return position.x;
            })
            .attr('cy', function(d) {
                return position.y;
            })
        ;


    },[position]);

    return (
        <React.Fragment>
            <Fuzziness
                ref={refFuzziness}
                r={30}
            />
            <Position
                ref={refPos}
                r={10}
            />
        </React.Fragment>
    );
}
