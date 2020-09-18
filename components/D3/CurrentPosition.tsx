import React, {useEffect, useState} from 'react';
import * as d3 from 'd3';

import {getCurrentPositionGeoJson} from 'helper/getCurrentPosition';


export default function CurrentPosition(props) {

    const svgId = 'main-svg';

    const positionId = 'main-position';

    useEffect(() => {

        console.log('start usefx current pos');


        if(undefined === props.d3PropertiesState){
            return;
        }

        var mapSvg = d3.select(`#${svgId}`)

        var positionGroup = mapSvg.select(`#${positionId}`);
        const currentPosition = getCurrentPositionGeoJson('initial', props.d3PropertiesState.marker.lat, props.d3PropertiesState.marker.lng);

        positionGroup.selectAll("circle")
            .data(currentPosition)
            .join("circle")

            .attr("transform", function(d) { return "translate(" + props.d3PropertiesState.geoPath.centroid(d) + ")"; })
            .attr("title", (d)=>{
                return d.properties.slug;
            })
            .attr("fill", (d, i)=>{
                return d.properties.fill;
            })
            .attr("stroke", (d)=>{
                return d.properties.stroke;
            })
            .attr("d", props.d3PropertiesState.geoPath)
            .attr("r", 5);


    });

    const text = 'Kind'
    return (
        <g id={positionId}></g>
    );

}
