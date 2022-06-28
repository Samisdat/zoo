import * as d3 from 'd3';

import React, {useEffect, useRef, useState} from 'react';

import {MapTransformInterface, useMap} from '../Context/MapContext';
import {boundingBoxGeoJson, svg} from '../../../constants';
import {angle} from '../../../constants';

import {CurrentPosition} from '../Navigation/Position/CurrentPosition';
import {Sketched} from './Sketched';
import {Navigation} from '../Navigation/Navigation';
import {CartesianPoint} from '../DevArtifacts/CartesianPoint';
import {FacilityBoxes} from './FacilityBoxes';
import {Markers} from './Markers/Markers';
import {Edge} from "../../../data/graphql/edge/edge";
import {Node} from "../../../data/graphql/node/node";
import {Marker} from "../../../data/graphql/marker/marker";

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

        boundingGroup.selectAll('path')
            .data([boundingBoxGeoJson])
            .enter()
            .append('path')
            .attr('fill', 'yellow')
            .attr('id', 'bounding_box')
            .attr('d', path as any)
            .attr('opacity', '0')
        ;

        const boundElement = boundingGroup.select('#bounding_box');

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

        const transform = `translate(${x}, ${y}) scale(${k}) ${rotate}`;

        d3.select(cartesianRef.current)
            .attr('transform', transform)
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
                <Navigation
                    cartesianTransform={cartesianTransform}
                    nodes={props.nodes}
                    edges={props.edges}
                />
                <Markers
                    cartesianScale={cartesianTransform?.k}
                    markers={props.markers}
                />

                <CurrentPosition />

                {/*
                <CartesianPoint />
                */}
            </g>
        </React.Fragment>
    );
}
