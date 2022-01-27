import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

import {useMap} from "../Context/MapContext";
import {Nodes} from "./Nodes";
import {Edges} from "./Edges";
import {Node} from "../../../strapi-api/entity/node/node";
import {Edge} from "../../../strapi-api/entity/edge/edge";
import {Dijkstra, RoutingGraph} from "./Dijkstra";

interface RoutingProperties {
    nodes: Node[];
    edges:Edge[];
}

const createGraph = (edges:Edge[]):RoutingGraph => {

    const graph:RoutingGraph = {}

    for(const edge of edges){


        if(undefined === graph[edge.startNode.id]){
            graph[edge.startNode.id] = [];
        }

        graph[edge.startNode.id].push({
            id:edge.endNode.id + '',
            distance:edge.edgeLength
        });

        if(undefined === graph[edge.endNode.id]){
            graph[edge.endNode.id] = [];
        }

        graph[edge.endNode.id].push({
            id:edge.startNode.id + '',
            distance:edge.edgeLength
        });

    }

    return graph;

};

export const Routing = (props:RoutingProperties) => {

    const refRouting = useRef(null);

    const {
        state: {path, ref},
    } = useMap();

    const graph = createGraph(props.edges);

    const [route, setRoute] = React.useState<RoutingGraph>(undefined);

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

        const routing = new Dijkstra(
            graph,
            399 + '',
            232 + '',
        );

        console.log(routing.getShortestRoute());

    },[path]);

    useEffect(() => {

        const routing = new Dijkstra(
            graph,
            399 + '',
            232 + '',
        );

        console.log(routing.getShortestRoute());

    },[route]);

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
