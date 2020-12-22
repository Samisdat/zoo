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

        positionGroup.selectAll('circle')
            .data(currentPosition)
            .join('circle')

            .attr('transform', function(d) { return 'translate(' + props.pathGenerator.centroid(d) + ')'; })
            .attr('title', (d)=>{
                return d.properties.slug;
            })
            .attr('fill', (d, i)=>{
                return d.properties.fill;
            })
            .attr('d', props.pathGenerator)
            .attr('r', 5);


    });

    return (
        <g id={positionId}></g>
    );

}
