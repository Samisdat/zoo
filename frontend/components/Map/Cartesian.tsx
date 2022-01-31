import * as d3 from 'd3';

import React, {FunctionComponent, useEffect, useRef} from 'react';
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {useMap} from "./Context/MapContext";

interface CartesianProps{
    boundingBox:MapElement;
}

/**
 * I created the map as a svg
 * The viewport is 2550px width and 1994px height
 *
 * And for each corner the gps coords are known and stored as bounding box.
 *
 * I render that bounding box by its gps within a scaled, panned and zoomed d3 map
 *
 * Then I know the width, height of the bounding box and with that information
 * I can just render all elements from my svg by their cartesian coords
 *
 * that is much faster then generate for each path an geojson and render that
 */
export const Cartesian:FunctionComponent<CartesianProps> = (props) => {

    const boundingRef = useRef(null);
    const cartesianRef = useRef(null);

    const {
        state: {path},
    } = useMap()

    const scaleToBound = () => {

        if(!path){
            return;
        }

        var boundingGroup = d3.select(boundingRef.current);

        console.log(props.boundingBox);

        boundingGroup.selectAll("path")
            .data([props.boundingBox])
            .enter()
            .append("path")
            .attr("fill", (d:MapElement)=>{
                return "yellow";
            })
            .attr("opacity", (d:MapElement)=>{
                return 1;
            })
            .attr("id", (d:MapElement)=>{
                return 'bounding_box';
            })
            .attr("d", path as any)
        ;

        const bound = boundingGroup.select(`#bounding_box`);

        const boundingBox = (bound.node() as SVGGraphicsElement).getBBox();
        console.log('boundingBox', boundingBox)


        const x = boundingBox.x;
        const y = boundingBox.y;

        const scale = boundingBox.width / 2550;

        const cartesianGroup = d3.select(cartesianRef.current);

        const center = {
            y: 997,
            x: 1275
        };

        const angle = 180

        const rotate = `rotate(${angle} ${center.x} ${center.y})`;
        cartesianGroup
            .attr("transform", "translate(" + x + "," + y + ") scale(" + scale +  ") " + rotate)
            .attr('visibility', 'visible')
        ;

    };

    useEffect(() => {
        scaleToBound();
    },[path]);

    return (
        <React.Fragment>
            <g ref={boundingRef}></g>
            <g ref={cartesianRef} visibility="hidden">
                { props.children }
            </g>
        </React.Fragment>
    );
}
