import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

import {useMap} from '../../../Context/MapContext';
import {Node} from '../../../../../data/graphql/node/node';
import {Route} from './Dijkstra';

interface RoutingProperties {
    nodes: Node[];
    route: Route
}

export const Nodes = (props:RoutingProperties) => {

    const {
        state: {path, position},
    } = useMap();

    const ref = useRef(null);

    useEffect(() => {

        if(!path){
            return;
        }

        const nodesGroup = d3.select(ref.current);

        nodesGroup.selectAll('circle')
        .data(props.nodes)
        .join('circle')
        .attr('cx', function(d) {
                return Math.round(d.x);
        })
        .attr('cy', function(d) {
                return Math.round(d.y);
        })
        .attr('data-pos', function(d) {
                return d.x + '-' + d.y;
        })
        .attr('stroke', (d, i)=>{
                return '#000';
        })
        .attr('stroke-width', (d, i)=>{
                return 1;
        })
        .attr('vector-effect', (d, i)=>{
                return 'non-scaling-stroke'
                return 1;
        })
        .attr('fill', (d, i)=>{

            if(undefined === props.route){
                return 'lightgrey';
            }

            if(true === props.route.nodes.includes(d.id + '')){
                    return 'red';
            }


            return 'lightgrey';

        })
        .attr('title', (d, i)=>{

                return d.id;

        })
        .attr('r', 5)
        .attr('opacity', 0)
        .attr('d', path as any)
        ;

    },[path, position]);

    return (
        <g ref={ref} />
    );

}
