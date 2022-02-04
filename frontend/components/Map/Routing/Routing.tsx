import React, {useEffect, useRef} from 'react';
import {Nodes} from "./Nodes";
import {Edges} from "./Edges";
import {Node} from "../../../strapi-api/entity/node/node";
import {Edge} from "../../../strapi-api/entity/edge/edge";
import {Dijkstra, Route, RoutingGraph} from "./Dijkstra";
import {MapTransformInterface} from "../Context/MapContext";

interface RoutingProperties {
    nodes: Node[];
    edges:Edge[];
    cartesianTransform:MapTransformInterface
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

    const graph = createGraph(props.edges);

    const [route, setRoute] = React.useState<Route>(undefined);

    useEffect(() => {

        const dijkstra = new Dijkstra(
            graph,
            399 + '',
            232 + '',
        );
        //return;
        setRoute(dijkstra.getShortestRoute());

    },[]);

    return (
        <g ref={refRouting}>
            <Edges
                edges={props.edges}
                route={route}
                cartesianTransform={props.cartesianTransform}
            />
            <Nodes
                nodes={props.nodes}
                route={route}
            />
        </g>
    );

}
