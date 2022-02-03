import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {useMap} from "../Context/MapContext";
import {addPolyfill} from "./polyfill";
import {getAbsolutePos} from "./Edges";
import {angle, svg} from "../../../constants";


export const CartesianCurrentPosition = (props) => {

    const {
        state: {ref,path, position, projection, transform},
    } = useMap();

    const refPoint = useRef(null);

    useEffect(() => {
        
        if(!path){
            return;
        }

        if(!position || undefined === position.lat || undefined === position.lng){
            return;
        }
        if(!props.groupProps){
            return;
        }

        const cartesianPos = projection([position.lng, position.lat]);

        console.log(cartesianPos, props.groupProps);

        const x = (cartesianPos[0] - props.groupProps.x) / props.groupProps.scale;
        const y = (cartesianPos[1] - props.groupProps.y) / props.groupProps.scale;

        const center = {
            y: (svg.height / 2),
            x: (svg.width / 2)
        };

        const rotate = `rotate(${angle} ${center.x} ${center.y})`;

        const nodesGroup = d3.select(refPoint.current);
        let circle = nodesGroup.select('circle')

        if(!circle.node()){
            nodesGroup.append('circle');
            circle = nodesGroup.select('circle')
        }

        circle.attr('cx', function(d) {
            return x;
        })
        .attr('cy', function(d) {
            return y;
        })
        .attr('fill', (d, i)=>{

            return 'purple';

        })
        .attr('r', 10)
        .attr('transform', rotate)


    },[path, position, transform]);

    return (
        <g ref={refPoint}></g>
    );
}
