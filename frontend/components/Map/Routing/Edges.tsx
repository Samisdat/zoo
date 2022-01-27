import React, {useEffect, useRef} from 'react';
import {useMap} from "../Context/MapContext";
import {Edge} from "../../../strapi-api/entity/edge/edge";
import * as d3 from "d3";

interface EdgesProperties {
    edges: Edge[];
}

export const Edges = (props:EdgesProperties) => {

    const {
        state: {path, position},
    } = useMap();

    const ref = useRef(null);

    useEffect(() => {

        if(!path){
            return;
        }

        const nodesGroup = d3.select(ref.current);

        nodesGroup.selectAll('path')
        .data(props.edges)
        .join('path')
        .style('fill', 'none')
        .style('stroke','#fe0000')
        .style('stroke-width', '2.08px')
        .attr('d', (d, i)=>{
                return d.d;

        })
        .attr('title', (d, i)=>{
                return d.id;
        })
        ;

    },[path, position]);

    return (
        <g ref={ref} />
    );

}
