import React, {useEffect} from 'react';

import * as d3 from 'd3';
import {getCurrentPositionGeoJson} from "helper/getCurrentPosition";

export default function CurrentPosition(props) {

    const svgId = 'main-svg';

    console.log(props)

    const positionId = 'main-position';

    const scaleToBound = () => {

        if(undefined === props.geoPath){
            return;
        }

        var mapSvg = d3.select(`#${svgId}`)
        console.log('scaleToBound');

        var positionGroup = mapSvg.select(`#${positionId}`);
        const currentPosition = getCurrentPositionGeoJson('initial', props.lat, props.lng);

        let update = positionGroup.selectAll("circle")
            .data(currentPosition)
            .join("circle")

            .attr("transform", function(d) { return "translate(" + props.geoPath.centroid(d) + ")"; })
            .attr("title", (d)=>{
                return d.properties.slug;
            })
            .attr("fill", (d, i)=>{
                return d.properties.fill;
            })
            .attr("stroke", (d)=>{
                return d.properties.stroke;
            })
            .attr("d", props.geoPath)
            .attr("r", 5)

        ;


    };

    useEffect(() => {
        scaleToBound();


    });

    const onClick = () => {
        props.callback('An update from child');
    };



    return (
        <React.Fragment>
            <g id={positionId}></g>
            <text onClick={onClick} id="eins" x="10" y="150" style={{
                color: '#fff',
                fontWeight: 'bold'
            }}>{props.text}</text>
        </React.Fragment>
    );

}