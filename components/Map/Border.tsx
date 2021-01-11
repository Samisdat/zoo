import React, {useEffect} from "react";

import * as d3 from "d3";
import {Feature} from "geojson";

export const Border = (props) => {

    console.log('Border');

    const simplePathId = "main-border";

    const ways = props.geoJson.features.filter((feature:Feature) => {

        if('border' === feature.properties?.type){
            return true;
        }

        return false;

    });

    const plotWays = () => {

        console.log('plotWays', ways)

        d3.select(`#${simplePathId}`)
            .selectAll("path")
            .data(ways)
            .enter()
            .append("path")
            .attr("fill", (d) => {
                return "none";
            })
            .attr("stroke", (d) => {
                return "#000";
            })
            .attr("stroke-width", (d) => {
                return '0.1px';
            })
            .attr("opacity", (d) => {
                return 1;
            })
            .attr("d", props.pathGenerator)


    };

    useEffect(() => {

        if (undefined === props.pathGenerator) {
            return;
        }

        plotWays();
    });

    return <g id={simplePathId}></g>;
};
