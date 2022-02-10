import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {MapTransformInterface, useMap} from "../Context/MapContext";
import {angle, svg} from "../../../constants";

export interface Coordinate{
    x:number;
    y:number;
}

export const rotateCords = (coordinate: Coordinate, degree:number):Coordinate => {

    if(180 !== degree){
        throw new Error('only 180 is implemented');
    }

    const center:Coordinate = {
        x: svg.width / 2,
        y: svg.height / 2
    }

    const rotated:Coordinate = {
        x: undefined,
        y: undefined
    };

    if(coordinate.x === center.x){
        rotated.x = center.x;
    }
    else if(coordinate.x > center.x){
        const x = coordinate.x - center.x;
        rotated.x = center.x - x;
    }
    else {
        const x = center.x - coordinate.x;
        rotated.x = center.x + x;
    }

    if(coordinate.y === center.y){
        rotated.y = center.y;
    }
    else if(coordinate.y > center.y){
        const y = coordinate.y - center.y;
        rotated.y = center.y - y;
    }
    else {
        const y = center.y - coordinate.y;
        rotated.y = center.y + y;
    }



    return rotated;

}

interface CartesianCurrentPositionProps{
    cartesianTransform:MapTransformInterface
}

export const CartesianCurrentPosition = ({cartesianTransform}:CartesianCurrentPositionProps) => {

    const {
        state: {position, projection, transform},
    } = useMap();

    const refPoint = useRef(null);
    const refPoint2 = useRef(null);

    useEffect(() => {

        if(!position || undefined === position.x || undefined === position.y){
            return;
        }

        const nodesGroup2 = d3.select(refPoint2.current);
        let circle2 = nodesGroup2.select('circle')

        if(!circle2.node()){
            nodesGroup2.append('circle');
            circle2 = nodesGroup2.select('circle');
            circle2.attr('id', 'CartesianCurrentPosition_Without_Rotate')
        }
        
        circle2.attr('cx', function(d) {
            return position.x;
        })
        .attr('cy', function(d) {
            return position.y;
        })
        .attr('fill', (d, i)=>{

            return 'yellow';

        })
        .attr('r', 30)
        .attr('opacity', 1)

    },[position, transform]);

    return (
        <React.Fragment>
            <g ref={refPoint}></g>
            <g ref={refPoint2}></g>
        </React.Fragment>
    );
}
