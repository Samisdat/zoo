import React, {useEffect, useRef, useState} from 'react';
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
        state: {ref, path, position, projection, transform},
    } = useMap();

    const [workaround, setWorkaround] = useState<number>(0);

    const refEdges = useRef(null);
    const refDump = useRef(null);

    useEffect(() => {

        if(!path){
            return;
        }

        const nodesGroup = d3.select(refEdges.current);

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
        .attr('id', (d, i)=>{
            return `edge-${d.id}`;
        })
        ;

    });

    const closestPoint =  (pathNode, point) => {

        const path = pathNode as SVGPathElement;

        const length = path.getTotalLength();

        const pointsOnPath = [];

        for(let i = 0; i < length; i += 10){

            const pointOnPath = path.getPointAtLength(i);

            pointsOnPath.push(pointOnPath);

        }

        console.log(point.node())

        const nodesGroup = d3.select(refDump.current);

        console.log()

        nodesGroup.selectAll('line')
            .data(pointsOnPath)
            .join('line')
            .attr('x1', function(d) {
                return d.x;
            })
            .attr('y1', function(d) {
                return d.y;
            })
            .attr('x2', function(d) {
                    return point.attr('cx');
            })
            .attr('y2', function(d) {
                return point.attr('cy');
            })

            .style("stroke", "black")



    }

    useEffect(() => {

        if(!position){
            return;
        }

        if(false === position.isWithin){
            return;
        }

        if(!projection){
            return;
        }

        const pos = d3.select('#CartesianCurrentPosition_Without_Rotate');

        if(!pos.node()){

            setTimeout(()=>{
                setWorkaround(workaround + 1)
            },100);
            return
        }

        const nodesGroup = d3.select(refEdges.current);

        const edges = [nodesGroup.select('#edge-517').node()];

        const distances = []

        for(let i = 0, x = edges.length; i < x; i += 1){

            distances.push(
                closestPoint(
                    edges[i],
                    pos
                )
            );

        }

},[position, projection, workaround]);

    return (
        <React.Fragment>
            <g
                ref={refEdges}
            />
            <g ref={refDump} />
        </React.Fragment>

    );

}
