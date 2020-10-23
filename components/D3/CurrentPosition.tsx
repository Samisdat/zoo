import React, {useEffect} from 'react';
import * as d3 from 'd3';

import {getCurrentPositionGeoJson} from 'helper/getCurrentPosition';

export const CurrentPosition = (props) => {

    const svgId = 'main-svg';

    const positionId = 'main-position';

    useEffect(() => {

        if(undefined === props.d3PropertiesState){
            return;
        }

        if(undefined === props.d3PropertiesState.geoPath){
            return;
        }

        var mapSvg = d3.select(`#${svgId}`)

        var positionGroup = mapSvg.select(`#${positionId}`);
        const currentPosition = getCurrentPositionGeoJson('initial', props.d3PropertiesState.marker.lat, props.d3PropertiesState.marker.lng);

        positionGroup.selectAll('circle')
            .data(currentPosition)
            .join('circle')

            .attr('transform', function(d) { return 'translate(' + props.d3PropertiesState.geoPath.centroid(d) + ')'; })
            .attr('title', (d)=>{
                return d.properties.slug;
            })
            .attr('fill', (d, i)=>{
                return d.properties.fill;
            })
            .attr('stroke', (d)=>{
                return d.properties.stroke;
            })
            .attr('d', props.d3PropertiesState.geoPath)
            .attr('r', 5);


    });

    return (
        <g id={positionId}></g>
    );

}
