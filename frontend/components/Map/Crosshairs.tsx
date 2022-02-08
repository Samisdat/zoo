import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

import {useMap} from "./Context/MapContext";

export const Crosshairs = (props) => {

    const {
        state: {path, position, projection, transform, dimension, zoomRef},
    } = useMap();

    const ref = useRef(null);

    const svgPoint = (element, x, y) => {

        const svg = d3.select('svg').node() as any;

        const pt = svg.createSVGPoint();
        pt.x = x;
        pt.y = y;

        return pt.matrixTransform( element.getScreenCTM().inverse() );

    }

    useEffect(() => {

        if(!path){
            return;
        }
        if(!zoomRef){
            return;
        }

        var zoomGroup = d3.select(zoomRef.current).node();

        var positionGroup = d3.select(ref.current);

        let radius = 8  / props.zoom;

        if(8 < radius){
            radius = 8
        }

        /*
        const center = {
            x: dimension.width / 2 / transform.k - transform.x / transform.k,
            y: dimension.height / 2 / transform.k - transform.y / transform.k,
        };
         */

        const center = {
            x: dimension.width / 2,
            y: dimension.height / 2,
        };

        const transformed = svgPoint(ref.current, center.x, center.y);

        var coordinates = [transformed.x, transformed.y];

        positionGroup.selectAll('circle')
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
                return 'yellow';
            })
            .attr('stroke', (d, i)=>{
                return 'blue';
            })
            .attr('stroke-width', (d, i)=>{
                return '3px';
            })
            .attr('d', path as any)
            .attr('r', radius )
            .attr('opacity', 0.5 )
            .attr('id', 'crosshair' )
        ;

    },[path, transform, dimension]);

    return (
        <g ref={ref}></g>
    );

}
