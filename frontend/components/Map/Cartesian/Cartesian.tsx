import * as d3 from 'd3';

import React, {useEffect, useRef, useState} from 'react';

import {MapTransformInterface, useMap} from "../Context/MapContext";
import {boundingBoxGeoJson, svg} from "../../../constants";
import {angle} from "../../../constants";

import {CurrentPosition} from "../Routing/CurrentPosition";
import {Sketched} from "./Sketched";
import {Routing} from "../Routing/Routing";
import {Edge} from "../../../strapi-api/entity/edge/edge";
import {Node} from "../../../strapi-api/entity/node/node";
import {CartesianPoint} from "./CartesianPoint";
import {FacilityBoxes} from "./FacilityBoxes";
import {Marker} from "../../../strapi-api/entity/marker/marker";
import {Markers} from "./Markers/Markers";

interface CartesianProps{
    markers:Marker[];
    edges: Edge[];
    nodes: Node[];
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
 * that is much leaner and faster then generate for each path an geojson and render that back to svg
 */
export const Cartesian = (props:CartesianProps) => {

    const boundingRef = useRef(null);
    const cartesianRef = useRef(null);

    const [cartesianTransform, setCartesianTransform] = useState<MapTransformInterface>(undefined);

    const {
        state: {path},
    } = useMap()

    const scaleToBound = () => {

        if(!path){
            return;
        }

        const boundingGroup = d3.select(boundingRef.current);

        boundingGroup.selectAll("path")
            .data([boundingBoxGeoJson])
            .enter()
            .append("path")
            .attr("fill", "yellow")
            .attr("id", 'bounding_box')
            .attr("d", path as any)
            .attr('opacity', '1')
        ;

        const boundElement = boundingGroup.select(`#bounding_box`);

        const bBox = (boundElement.node() as SVGGraphicsElement).getBBox();

        const x = bBox.x;
        const y = bBox.y;

        const k = bBox.width / svg.width;

        setCartesianTransform({
            x,
            y,
            k
        });

        const center = {
            y: (svg.height / 2),
            x: (svg.width / 2)
        };

        const rotate = `rotate(${angle} ${center.x} ${center.y})`;

        d3.select(cartesianRef.current)
            .attr("transform", "translate(" + x + "," + y + ") scale(" + k +  ") " + rotate)
            .attr('visibility', 'visible')
            .attr('opacity', '1')
        ;

    };

    useEffect(() => {
        scaleToBound();
    },[path]);

    return (
        <React.Fragment>
            <g ref={boundingRef}></g>
            <g
                id='cartesian'
                ref={cartesianRef}
            >
                <Sketched />
                <FacilityBoxes />
                <Routing
                    cartesianTransform={cartesianTransform}
                    nodes={props.nodes}
                    edges={props.edges}
                />

                <Markers
                    markers={props.markers}
                />

                <CurrentPosition />

                <CartesianPoint />

            </g>
        </React.Fragment>
    );
}