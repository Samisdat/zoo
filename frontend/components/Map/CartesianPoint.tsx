import React, {useEffect, useRef} from 'react';
import {useMap, Position} from "./Context/MapContext";

import * as d3 from 'd3';

export const getPosition = (element: SVGGraphicsElement, position: Position) => {

    const svg = document.getElementsByTagName('svg')[0];

    const pt = svg.createSVGPoint();

    pt.x = position.x;
    pt.y = position.y;

    return pt.matrixTransform( element.getScreenCTM().inverse() );

}


export const CartesianPoint = () => {

    const {
        state: {exchange, transform},
        dispatch
    } = useMap();

    const ref = useRef(null);

    useEffect(()=> {

        const position = {
            x:200,
            y:200
        }

        dispatch({
            type: 'SET_POINT_EXCHANGE',
            exchange: {
                position
            }
        });

        console.log('once')

    },[]);

    useEffect(()=>{

        if(!exchange){
            return;
        }

        if(!exchange.position){
            return;
        }

        const {position} = exchange;

        position.x = (position.x - transform.x / transform.y);

        position.y = (position.y - transform.y / transform.y)

        const cartesian = d3.select('#cartesian').node() as SVGGraphicsElement;

        const localPos = getPosition(cartesian, position);

        d3.select(ref.current)
            .attr('cx', function(d) {
                return localPos.x;
            })
            .attr('cy', function(d) {
                return localPos.y;
            })
        ;



    }, [exchange])

    return (
        <circle
            ref={ref}
            r={20}
            fill={'red'}
            opacity={0.5}
        />

    );

}
