import React, {useEffect, useRef} from 'react';
import {Edge} from 'strapi-api/entity/edge/edge';
import * as d3 from 'd3';
import {useMap} from '../../Context/MapContext';


interface CurrentRouteProps {
    edges: Edge[];
}

export const Routing = ({edges}:CurrentRouteProps) => {

    const {
        state: {position, routing},
    } = useMap();

    const outerRef = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {

        if(!routing){
            return;
        }

        if('response' !== routing.type){
            return;
        }

        const route = routing.route;

        const current = edges.filter((edge)=>{

            if(edge.id === position.edgeId){
                return true;
            }

            return(
                route.nodes.includes(edge.startNode.id + '') &&
                route.nodes.includes(edge.endNode.id + '')
            )

        });

        const outerGroup = d3.select(outerRef.current);

        outerGroup.selectAll('path')
            .data(current)
            .join('path')
            .attr('d', (d)=>{
                return d.d;
            })
            .attr('fill', 'none')
            .attr('stroke', '#0A6001')
            .attr('stroke-width', '4px')
        ;

        const innerGroup = d3.select(innerRef.current);

        innerGroup.selectAll('path')
            .data(current)
            .join('path')
            .attr('d', (d)=>{
                return d.d;
            })
            .attr('fill', 'none')
            .attr('stroke', '#00a800')
            .attr('stroke-width', '2px')

    },[routing]);


    return (
        <React.Fragment>
            <g
                ref={outerRef}
            ></g>
            <g
                ref={innerRef}
            ></g>
        </React.Fragment>
    );

}
