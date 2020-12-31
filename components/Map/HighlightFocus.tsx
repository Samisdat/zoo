import React, {useEffect} from "react";
import {Feature} from "geojson";
import * as d3 from "d3";

export const HighlightFocus = (props) => {

    const groupId = 'highlight-focus';

    let elementsGroup = undefined;

    useEffect(() => {

        if (undefined === props.mapState) {
            return;
        }

        if (undefined === props.mapState.pathGenerator) {
            return;
        }

        if('none' !== props.focus){

            const box = {
                ...props.focus
            };

            if(undefined === elementsGroup){
                elementsGroup  = d3.select(`#${groupId}`);
            }

            document.getElementById(groupId).innerHTML = '';

            elementsGroup.selectAll("path")
                .exit()
                .data([box])
                .enter()
                .append("path")
                .attr("fill", (d:Feature)=>{
                    return '#0f0';
                })
                .attr("opacity", 0.7)
                .attr("id", (d:Feature)=>{
                    return d.properties.slug;
                })
                .attr("d", props.mapState.pathGenerator)

        }


    });

    return (
        <g id={groupId}></g>
    );

}
