import React, {useEffect} from "react";

import * as d3 from "d3";
import {Feature} from "geojson";

export const Border = (props) => {

    const boxId = "main-box";
    const simplePathId = "main-border";

    const ways = props.geoJson.features.filter((feature:Feature) => {

        if('border' === feature.properties?.type){
            return true;
        }

        return false;

    });

    const boundingBoxGeoJson = props.geoJson.features.filter((feature:Feature)=>{

        return ('bounding-box' === feature.properties.type);

    });

    const plotWays = () => {

        d3.select(`#${boxId}`)
            .selectAll("path")
            .data(boundingBoxGeoJson)
            .enter()
            .append("path")
            .attr("fill", (d:Feature)=>{
                return "yellow";
            })
            .attr("stroke", (d:Feature)=>{
                return "green";
            })
            .attr("stroke-width", (d:Feature)=>{
                return '10px';
            })
            .attr("opacity", (d:Feature)=>{
                return 1;
            })
            .attr("id", (d:Feature)=>{
                return d.properties.slug;
            })
            .attr("d", props.pathGenerator)
        ;

        d3.select(`#${simplePathId}`)
            .selectAll("path")
            .data(ways)
            .enter()
            .append("path")
            .attr("fill", (d) => {
                return "lime";
            })
            .attr("stroke", (d) => {
                return "#000";
            })
            .attr("stroke-width", (d) => {
                return '10px';
            })
            .attr("opacity", (d) => {
                return 1;
            })
            .attr("d", props.pathGenerator)

    };

    useEffect(() => {

        return;
        if (undefined === props.pathGenerator) {
            return;
        }

        plotWays();
    });

    return (<React.Fragment>
        <g id={boxId}></g>
        <g id={simplePathId}></g>
    </React.Fragment>);
};
