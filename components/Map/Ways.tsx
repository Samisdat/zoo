import React, {useEffect} from "react";

import * as d3 from "d3";

export const Ways = (props) => {

    const simplePathId = "main-ways";

    const plotWays = () => {

        d3.select(`#${simplePathId}`)
            .selectAll("path")
            .data(props.simpleWays)
            .enter()
            .append("path")
            .attr("fill", (d) => {
                return "none";
            })
            .attr("stroke", (d) => {
                return "#000";
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
