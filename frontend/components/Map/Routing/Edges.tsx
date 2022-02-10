import React, {useEffect, useRef, useState} from 'react';
import {MapTransformInterface, PositionInterface, useMap} from "../Context/MapContext";
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

const filterDistances = (distances:EdgeSample[]):EdgeSample[] => {

    const sum = distances.reduce((accumulator:any, currentValue, currentIndex, array) => {
        return accumulator + currentValue.length;
    }, 0);

    const average = sum/ distances.length;

    const variance1 = distances.reduce((accumulator, currentValue, currentIndex, array) => {
        accumulator += Math.pow(currentValue.length - average, 2);
        return accumulator;
    }, 0);

    const variance = Math.sqrt(variance1 / (distances.length - 1));

    const firstThree = distances.slice(0, 3);

    const sumFirstThree = firstThree.reduce((accumulator:any, currentValue, currentIndex, array) => {
        return accumulator + currentValue.length;
    }, 0);

    const averageFirstThree = sumFirstThree/ firstThree.length;

    distances = distances.filter((distance)=>{
        return (distance.length - averageFirstThree < variance);
    });

    return (distances);

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
        state: {ref, path, position_raw, projection, transform},
        dispatch
    } = useMap();

    const refEdges = useRef(null);
    const refDump = useRef(null);
    const refMatch = useRef(null);

    const svgPoint =  (element, x, y) => {

        const pt = ref.current.createSVGPoint();
        pt.x = x;
        pt.y = y;

        return pt.matrixTransform( element.getScreenCTM().inverse() );

    }


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

    const firstSample =  (pathNode, point:Coordinate, samplingRate= 20):EdgeSample[] => {

        const path = pathNode as SVGPathElement;

        const id = parseInt(path.getAttribute('id').replace(idPrefix, ''), 10);

        const length = path.getTotalLength();

        const pointsOnPath = [];

        const samples: EdgeSample[] = []

        for(let i = 0; i < length; i += samplingRate){

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

    const sampleMatches = (samples:EdgeSample[], transposedCoord):EdgeSample[] => {

        const matches:EdgeSample[] = [];

        samples = samples.reduce((accumulator:any, currentValue)=>{

            const edgeAlreadyWithin = accumulator.find((elem)=>{
                return (currentValue.edgeId === elem?.edgeId);
            });

            if(!edgeAlreadyWithin){
                accumulator.push(currentValue);
            }

            return accumulator;

        }, [])

        for(let i = 0, x = samples.length; i < x; i += 1){

            let distances:EdgeSample[] = []

            const sample = samples[i];

            const edge = d3.select(`#${idPrefix}${sample.edgeId}`).node();

            distances = distances.concat(
                firstSample(
                    edge,
                    transposedCoord,
                    5
                )
            );

            distances.sort((a:EdgeSample, b:EdgeSample) => {
                if (a.length < b.length){
                    return -1;
                }
                if (a.length > b.length) {
                    return 1;
                }

                return 0;

            });

            matches.push(distances[0]);

        }

        return matches;

    }

    useEffect(() => {

        if(!position_raw){
            return;
        }

        if(!projection){
            return;
        }

        if(!props.cartesianTransform){
            return;
        }

        const currentPos = projection([position_raw.lng, position_raw.lat]);

        const transposedCoord = transposeCoords(
            {
                x:currentPos[0],
                y:currentPos[1]
            },
            props.cartesianTransform
        );

        const nodesGroup = d3.select(refEdges.current);

        const edges = nodesGroup.selectAll('path').nodes();

        let distances:EdgeSample[] = []

        for(let i = 0, x = edges.length; i < x; i += 1){

            distances = distances.concat(
                firstSample(
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

        distances = distances.slice(0, 40);

        distances = filterDistances(distances);

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

        const matches = sampleMatches(distances, transposedCoord);

        const matchGroup = d3.select(refMatch.current);

        const circles = matchGroup.selectAll('circle')
            .data(matches)
            .join('circle')
            .attr('cx', function(d) {
                return d.samplePos.x;
            })
            .attr('cy', function(d) {
                return d.samplePos.y;
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

                return 'yellow';

            })
            .attr('r', 5)
        ;


        if(1 === matches.length){

            const bbox = (circles.nodes()[0] as any).getClientRects()[0];

            const clickX = bbox.x - bbox.width / 2;
            const clickY = bbox.y - bbox.height / 2;

            const x = (clickX - transform.x) / transform.k;
            const y = (clickY - transform.y) / transform.k

            const [lng, lat] = projection.invert([x, y]);

            const isWithin = true;
            const isGPS = true;
            const text = 'refactor interface';
            const fuzziness = 0;

            const position:PositionInterface = {
                lat: lat,
                lng: lng,
                isWithin,
                isGPS,
                text,
                fuzziness,
                x: matches[0].samplePos.x,
                y: matches[0].samplePos.y
            };

            dispatch({
                type: 'SET_POSITION',
                position
            });

        }

    },[position_raw, projection, props.cartesianTransform, transform]);

    return (
        <React.Fragment>
            <g
                ref={refEdges}
            />
            <g ref={refDump} />
            <g ref={refMatch} />
        </React.Fragment>

    );

}
