import * as d3 from 'd3';

import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {useMap} from "./Context/MapContext";
import {svg} from "../../constants";
import {angle} from "../../constants";

import {CartesianCurrentPosition} from "./Routing/CartesianCurrentPosition";

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
 * that is much faster then generate for each path an geojson and render that back to svg
 */
export const Cartesian:FunctionComponent<CartesianProps> = (props) => {

    const boundingRef = useRef(null);
    const cartesianRef = useRef(null);

    const [groupProps, setGroupProps] = useState<any>(undefined);

    const {
        state: {path},
    } = useMap()

    const scaleToBound = () => {

        if(!path){
            return;
        }

        const boundingGroup = d3.select(boundingRef.current);

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
            .attr('opacity', '.5')
        ;

        const boundElement = boundingGroup.select(`#bounding_box`);

        const bBox = (boundElement.node() as SVGGraphicsElement).getBBox();

        const x = bBox.x;
        const y = bBox.y;

        const scale = bBox.width / svg.width;

        setGroupProps({
            x,
            y,
            scale
        });

        const center = {
            y: (svg.height / 2),
            x: (svg.width / 2)
        };

        const rotate = `rotate(${angle} ${center.x} ${center.y})`;

        d3.select(cartesianRef.current)
            .attr("transform", "translate(" + x + "," + y + ") scale(" + scale +  ") " + rotate)
            .attr('visibility', 'visible')
            .attr('opacity', '.5')
        ;

    };

    useEffect(() => {
        scaleToBound();
    },[path]);

    useEffect(() => {
        console.log(groupProps);
    },[groupProps]);

    return (
        <React.Fragment>
            <g ref={boundingRef}></g>
            <g ref={cartesianRef}>
                { props.children }
                <CartesianCurrentPosition
                    groupProps={groupProps}
                />
            </g>
        </React.Fragment>
    );
}
