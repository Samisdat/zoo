import React, {useEffect} from 'react';

import * as d3 from 'd3';

export default function Ways(props) {

    const svgId = 'main-svg';

    const simplePathId = 'main-ways';

    const scaleToBound = () => {

        if(undefined === props.d3PropertiesState){
            return;
        }

        var mapSvg = d3.select(`#${svgId}`)

        var simplePathGroup = mapSvg.select(`#${simplePathId}`);

        simplePathGroup.selectAll("circle")
            .data(props.features)
            .enter()
            .append("circle")
            .attr("transform", function(d) { return "translate(" + props.d3PropertiesState.geoPath.centroid(d) + ")"; })
            .attr("fill", (d)=>{
                return '#f00';
            })
            .attr("stroke", (d)=>{
                return '#0f0';
            })
            .attr("d", props.d3PropertiesState.geoPath)
            .attr("r", 5);

    };

    useEffect(() => {

        scaleToBound();

    });

    return (
        <React.Fragment>
            <g id={simplePathId}></g>
        </React.Fragment>
    );

}
