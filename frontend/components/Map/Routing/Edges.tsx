import React, {useEffect, useRef, useState} from 'react';
import {MapTransformInterface, useMap} from "../Context/MapContext";
import {Edge} from "../../../strapi-api/entity/edge/edge";
import * as d3 from "d3";
import {Route} from "./Dijkstra";
import {Coordinate, rotateCords} from "./CartesianCurrentPosition";

interface EdgesProperties {
    edges: Edge[];
    route: Route;
    cartesianTransform:MapTransformInterface
}

interface EdgeSample{
    edgeId:number;
    sampleAtLength:number;
    samplePos:Coordinate;
    length:number;
}

const transposeCoords = (coordinate:Coordinate, transform:MapTransformInterface):Coordinate => {

    // console.log('transposeCoords')
    // console.log('')
    // console.log('coordinate', coordinate);
    // console.log('transform', transform);

    const x = (coordinate.x - transform.x) / transform.k;
    const y = (coordinate.y - transform.y) / transform.k;

    // console.log('x', x);
    // console.log('y', y);


    const rotated = rotateCords({x,y},180);

    // console.log('rotated', rotated);

    // console.log('/transposeCoords');

    return rotated;

}

const getDistance = (source:Coordinate, target:Coordinate):number => {

    // console.log('getDistance')
    // console.log('')
    // console.log('source', source);
    // console.log('target', target);

    const x = source.x - target.x;
    const y = source.y - target.y;

    return Math.sqrt(
        x * x + y * y
    );

};

const idPrefix = 'edge-';

export const Edges = (props:EdgesProperties) => {

    const {
        state: {ref, path, position, projection, transform},
    } = useMap();

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
        .style('stroke-width', '2px')
        .attr('d', (d, i)=>{
                return d.d;

        })
        .attr('id', (d, i)=>{
            return `${idPrefix}${d.id}`;
        })
        ;

    });

    const closestPoint =  (pathNode, point:Coordinate):EdgeSample[] => {

        const path = pathNode as SVGPathElement;

        const id = parseInt(path.getAttribute('id').replace(idPrefix, ''), 10);

        const length = path.getTotalLength();

        const pointsOnPath = [];

        const samples: EdgeSample[] = []

        for(let i = 0; i < length; i += 10){

            const pointOnPath = path.getPointAtLength(i);

            const edgeSample: EdgeSample = {
                edgeId:id,
                sampleAtLength: i,
                samplePos:pointOnPath,
                length:getDistance(pointOnPath, point)
            };

            samples.push(edgeSample);

            pointsOnPath.push(pointOnPath);

        }

        return samples;

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

        if(!props.cartesianTransform){
            return;
        }

        const currentPos = projection([position.lng, position.lat]);

        const transposedCoord = transposeCoords(
            {
                x:currentPos[0],
                y:currentPos[1]
            },
            props.cartesianTransform
        );

        const nodesGroup = d3.select(refEdges.current);

        const edges = nodesGroup.selectAll('path').nodes();

        let distances = []

        for(let i = 0, x = edges.length; i < x; i += 1){

            distances = distances.concat(
                closestPoint(
                    edges[i],
                    transposedCoord
                )
            );

        }

        distances.sort((a:EdgeSample, b:EdgeSample) => {
            if (a.length < b.length){
                return -1;
            }
            if (a.length > b.length) {
                return 1;
            }

            return 0;

        });

        distances = distances.slice(0, 10);

        // @todo cut if diff between first is more the standard abr
        distances.reduce((accumulator:any, currentValue, currentIndex, array) => {

            return accumulator + currentValue;
        }, {});


        const dmpGroup = d3.select(refDump.current);

        dmpGroup.selectAll('line')
            .data(distances)
            .join('line')
            .attr('x1', function(d) {
                return d.samplePos.x;
            })
            .attr('y1', function(d) {
                return d.samplePos.y;
            })
            .attr('x2', function(d) {
                return transposedCoord.x;
            })
            .attr('y2', function(d) {
                return transposedCoord.y;
            })

            .style("stroke", "black")



    },[position, projection, props.cartesianTransform]);

    return (
        <React.Fragment>
            <g
                ref={refEdges}
            />
            <g ref={refDump} />
        </React.Fragment>

    );

}
