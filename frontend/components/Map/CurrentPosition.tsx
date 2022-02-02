import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

import {getCurrentPositionGeoJson} from 'helper/getCurrentPosition';
import {useMap} from "./Context/MapContext";
import {Feature} from "geojson";

export const CurrentPosition = (props) => {

    const {
        state: {path, position, projection},
    } = useMap();

    const ref = useRef(null);

    useEffect(() => {
        
        if(!path){
            return;
        }

        if(!position || undefined === position.lat || undefined === position.lng){
            return;
        }

        var positionGroup = d3.select(ref.current);

        const currentPosition = getCurrentPositionGeoJson(
            'initial',
            position.lat,
            position.lng,


    );

        let radius = 8  / props.zoom;

        if(8 < radius){
            radius = 8
        }

        var coordinates = projection([position.lng, position.lat]);

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
                return 0.5;
            })
            .attr('fill', (d, i)=>{
                return 'green';
            })
            .attr('stroke', (d, i)=>{
                return 'blue';
            })
            .attr('d', path as any)
            .attr('r', radius )
            .attr('id', 'super' )

        ;

        const element:unknown = document.getElementById('super')
        const posElement = element as SVGElement;
        console.log(posElement)

        var point:any = document.getElementsByTagName('svg')[0].createSVGPoint();//here roor is the svg's id
        point.x = d3.select(posElement).attr("cx");//get the circle cx
        point.y = d3.select(posElement).attr("cy");//get the circle cy
        var newPoint = point.matrixTransform((posElement as SVGGraphicsElement).getCTM());//new point after the transform
        console.log(newPoint);



    },[path, position]);

    return (
        <g ref={ref}></g>
    );

}
