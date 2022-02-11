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
export const CurrentPosition = () => {

    const {
        state: {position},
    } = useMap();

    const ref = useRef(null);

    useEffect(() => {

        if(!position || undefined === position.x || undefined === position.y){
            return;
        }

        d3.select(ref.current)
            .attr('cx', function(d) {
                return position.x;
            })
            .attr('cy', function(d) {
                return position.y;
            })
            .attr('r', 30)
        ;

    },[position]);

    return (
        <circle
            ref={ref}
            fill={'yellow'}
        />
    );
}
