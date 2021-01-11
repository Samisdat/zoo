import React, {useEffect} from 'react';
import * as d3 from 'd3';

import {getCurrentPositionGeoJson} from 'helper/getCurrentPosition';

export const CurrentPosition = (props) => {

    const svgId = 'main-svg';

    const positionId = 'main-position';

    useEffect(() => {

        if(undefined === props.pathGenerator){
            return;
        }

        var mapSvg = d3.select(`#${svgId}`)

        var positionGroup = mapSvg.select(`#${positionId}`);
        const currentPosition = getCurrentPositionGeoJson('initial', props.marker.lat, props.marker.lng);

        let radius = 5  / props.zoom;

        if(5 < radius){
            radius = 5
        }

        positionGroup.selectAll('circle')
            .data(currentPosition)
            .join('circle')

            .attr('transform', function(d) { return 'translate(' + props.pathGenerator.centroid(d) + ')'; })
            .attr('title', (d)=>{
                return d.properties.slug;
            })
            .attr('opacity', (d, i)=>{
                return 1;
            })
            .attr('fill', (d, i)=>{
                return 'red';
            })
            .attr('d', props.pathGenerator)
            .attr('r', 5 );


    });

    return (
        <g id={positionId}></g>
    );

}
