import React, {useEffect, useRef} from 'react';
import {useMap} from "../Context/MapContext";
import {Edge} from "../../../strapi-api/entity/edge/edge";
import * as d3 from "d3";
import {Route} from "./Dijkstra";
import {Feature} from "geojson";

import {addPolyfill} from './polyfill';

interface EdgesProperties {
    edges: Edge[];
    route: Route
}


/**
 * Based 100% on
 * https://bl.ocks.org/mbostock/8027637
 * by https://github.com/mbostock
 */
const __closestPoint =  (pathNode, point) => {

    const distance2 = (p) => {
        var dx = p.x - point[0],
            dy = p.y - point[1];
        return dx * dx + dy * dy;
    }

    var pathLength = pathNode.getTotalLength(),
        precision = 8,
        best,
        bestLength,
        bestDistance = Infinity;

    // linear scan for coarse approximation
    for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
        if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
            best = scan, bestLength = scanLength, bestDistance = scanDistance;
        }
    }

    // binary search for precise estimate
    precision /= 2;
    while (precision > 0.5) {
        var before,
            after,
            beforeLength,
            afterLength,
            beforeDistance,
            afterDistance;
        if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
            best = before, bestLength = beforeLength, bestDistance = beforeDistance;
        } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
            best = after, bestLength = afterLength, bestDistance = afterDistance;
        } else {
            precision /= 2;
        }
    }

    best = [best.x, best.y];
    best.distance = Math.sqrt(bestDistance);
    best.edge = pathNode;
    return best;

}



export const getAbsolutePos = (element) => {

    if(!element){
        return undefined;
    }


    const boundingClientRect = element.getBoundingClientRect();

    return{
        x: boundingClientRect.x + (boundingClientRect.width / 2),
        y: boundingClientRect.y + (boundingClientRect.height / 2),
    }

};


export const Edges = (props:EdgesProperties) => {

    const {
        state: {ref, path, position, projection, transform},
    } = useMap();

    const refEdges = useRef(null);
    const refDump = useRef(null);

    const convertCoord = (source, target) => {
        console.log('source', source);
        console.log('target', target);

        const absolute = getAbsolutePos(source);
        console.log('absolute', absolute);

        var pt = ref.current.createSVGPoint();
        pt.x = absolute.x;
        pt.y = absolute.y;
        var globalPoint = pt.matrixTransform(ref.current.getScreenCTM().inverse());

        var globalToLocal = target.getTransformToElement(ref.current).inverse();

        var inObjectSpace = globalPoint.matrixTransform( globalToLocal );

        return inObjectSpace;

    }

    const convertCoord_ = (absoluteX:number, absoluteY:number, target) => {

        var pt = ref.current.createSVGPoint();
        pt.x = absoluteX;
        pt.y = absoluteY;

        var globalPoint = pt.matrixTransform(ref.current.getScreenCTM().inverse());

        var globalToLocal = target.getTransformToElement(ref.current).inverse();

        var inObjectSpace = globalPoint.matrixTransform( globalToLocal );

        return inObjectSpace;

    }


    useEffect(() => {

        if(!path){
            return;
        }

        return;
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

        const nodesGroup = d3.select(refDump.current);

        nodesGroup.selectAll('circle')
            .data([point])
            .join('circle')

            .attr('cx', function(d) {
                return d[0] + transform.x;
            })
            .attr('cy', function(d) {
                return d[1] - transform.y;
            })

            .attr('opacity', (d, i)=>{
                return 1;
            })
            .attr('fill', (d, i)=>{
                return 'yellow';
            })
            .attr('stroke', (d, i)=>{
                return 'blue';
            })

            .attr('r', 20 );

        const currentPosElement = nodesGroup.select('circle').node();

        const superElem = document.getElementById('super');

        if(!superElem){
            return;
        }

        console.log(superElem);
        const coord = convertCoord(superElem, currentPosElement);

        (currentPosElement as any).setAttribute('cy', coord.y);
        (currentPosElement as any).setAttribute('cx', coord.x);


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
                    return coord.x;
            })
            .attr('y2', function(d) {
                return coord.y;
            })

            .style("stroke", "black")
            .attr('d', path as any)


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

        // for whatever reason
        return;

        const cartesianPos = projection([position.lng, position.lat]);
        console.log(cartesianPos);


        const nodesGroup = d3.select(refEdges.current);

        const edges = [nodesGroup.select('#edge-520').node()];

        const distances = []

        for(let i = 0, x = edges.length; i < x; i += 1){

            distances.push(
                closestPoint(
                    edges[i],
                    cartesianPos
                )
            );

        }

},[position, projection]);

    return (
        <React.Fragment>
            <g
                ref={refEdges}
            />
            <g ref={refDump} />
        </React.Fragment>

    );

}
