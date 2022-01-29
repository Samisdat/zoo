import React, {useEffect, useRef} from 'react';
import {useMap} from "../Context/MapContext";
import {Edge} from "../../../strapi-api/entity/edge/edge";
import * as d3 from "d3";
import {Route} from "./Dijkstra";

interface EdgesProperties {
    edges: Edge[];
    route: Route
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
        .attr('stroke',(edge)=>{

            if(undefined === props.route){
                return 'lightgrey';
            }

            if( 
                true === props.route.nodes.includes(edge.startNode.id + '') &&
                true === props.route.nodes.includes(edge.endNode.id + '')
            ){
                return 'red';
            }


            return 'lightgrey';


        })
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
