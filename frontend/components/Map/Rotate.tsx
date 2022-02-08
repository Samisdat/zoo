import * as d3 from 'd3';
import React, {FunctionComponent, useEffect, useRef} from "react";

import {useMap} from "./Context/MapContext";

interface RotateProps {
}

export const Rotate:FunctionComponent<RotateProps>  = ({children}) => {

    const {
        state: {path, angle, transform, dimension},
    } = useMap();

    const rotateRef = useRef(null);
    const dumpRef = useRef(null);

    const svgPoint = (element, x, y) => {

        const svg = d3.select('svg').node() as any;

        const pt = svg.createSVGPoint();
        pt.x = x;
        pt.y = y;

        return pt.matrixTransform( element.getScreenCTM().inverse() );

    }

    const getTransformTextWithRotate = ():string => {

        const center = {
            x: dimension.width / 2,
            y: dimension.height / 2,
        };

        const transformed = svgPoint(rotateRef.current, center.x, center.y);

        const rotate = `rotate(${angle} ${transformed.x} ${transformed.y})`;

        return rotate;

    }

    useEffect(() => {

        const mapSvg = d3.select(rotateRef.current)

        const rotate = getTransformTextWithRotate();
        //console.log(rotate);
        mapSvg.attr('transform', rotate);

    }, [angle, dimension, transform]);

    useEffect(() => {

        const mapSvg = d3.select(dumpRef.current)

        const center = {
            x: dimension.width / 2,
            y: dimension.height / 2,
        };

        const transformed = svgPoint(rotateRef.current, center.x, center.y);
        //console.log(transformed);
        var coordinates = [transformed.x, transformed.y];

        const radius = 9

        mapSvg.selectAll('circle')
            .data([coordinates])
            .join('circle')

            //.attr('transform', function(d) { return 'translate(' + path.centroid(d as Feature) + ')'; })
            .attr("cx", (d, i)=>{
                return d[0];
            })
            .attr("cy", (d, i)=>{
                return d[1];
            })
            .attr('opacity', (d, i)=>{
                return 1;
            })
            .attr('fill', (d, i)=>{
                return 'red';
            })
            .attr('stroke', (d, i)=>{
                return 'lime';
            })
            .attr('stroke-width', (d, i)=>{
                return '3px';
            })
            .attr('d', path as any)
            .attr('r', radius )
            .attr('opacity', 0.5 )
        ;

    }, [transform, dimension]);

    return (
        <g ref={rotateRef}>

            {children}

            <g ref={dumpRef}></g>
        </g>
    );

}
