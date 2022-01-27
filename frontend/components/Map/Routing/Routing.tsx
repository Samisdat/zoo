import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

import {useMap} from "../Context/MapContext";
import {Nodes} from "./Nodes";
import {Edges} from "./Edges";
import {Node} from "../../../strapi-api/entity/node/node";
import {Edge} from "../../../strapi-api/entity/edge/edge";

interface RoutingProperties {
    nodes: Node[];
    edges:Edge[];
}

export const Routing = (props:RoutingProperties) => {

    const refRouting = useRef(null);

    const {
        state: {path, projection, ref},
    } = useMap();

    const scaleToBound = () => {

        if(!path){
            return;
        }

        const mapSvg = d3.select(ref.current)

        const bound = mapSvg.select(`#bounding_box`);

        const boundingBox = (bound.node() as SVGGraphicsElement).getBBox();

        const x = boundingBox.x;
        const y = boundingBox.y;

        const scale = boundingBox.width / 2550;

        const routingGroup = d3.select(refRouting.current);

        const center = {
            y: 997,
            x: 1275
        };

        const angle = 180

        const rotate = `rotate(${angle} ${center.x} ${center.y})`;

        routingGroup
            .attr("transform", "translate(" + x + "," + y + ") scale(" + scale +  ") " + rotate)
            .attr('visibility', 'visible')
            .attr('id', 'foo')
        ;

    };

    useEffect(() => {
        scaleToBound();
    },[path, projection]);

    return (
        <g ref={refRouting}>
            <Edges
                edges={props.edges}
            />
            <Nodes
                nodes={props.nodes}
            />
        </g>
    );

}
