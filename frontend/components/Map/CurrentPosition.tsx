import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

import {getCurrentPositionGeoJson} from 'helper/getCurrentPosition';
import {useMap} from "./Context/MapContext";
import {Feature} from "geojson";

export const CurrentPosition = (props) => {

    const {
        state: {path, position},
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

        positionGroup.selectAll('circle')
            .data(currentPosition)
            .join('circle')

            .attr('transform', function(d) { return 'translate(' + path.centroid(d as Feature) + ')'; })
            .attr('title', (d)=>{
                return d.properties.slug;
            })
            .attr('opacity', (d, i)=>{
                return 1;
            })
            .attr('fill', (d, i)=>{
                return 'green';
            })
            .attr('stroke', (d, i)=>{
                return 'blue';
            })
            .attr('d', path as any)
            .attr('r', radius );


    },[path, position]);

    return (
        <g ref={ref}></g>
    );

}
