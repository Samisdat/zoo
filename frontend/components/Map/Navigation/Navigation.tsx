import React, {useEffect, useRef} from 'react';
import {Nodes} from './Routing/Graph/Nodes';
import {Edges} from './Routing/Graph/Edges';
import {Dijkstra, Route, RoutingGraph} from './Routing/Graph/Dijkstra';
import {MapTransformInterface, useMap} from '../Context/MapContext';
import {ResolvePosition} from './Position/ResolvePosition';
import {Track} from './Position/Track';
import {Routing} from './Routing/Routing';
import {Edge} from "../../../data/graphql/edge/edge";
import {Node} from "../../../data/graphql/node/node";

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

export const Navigation = (props:RoutingProperties) => {

    const {
        state: {position, routing},
        dispatch
    } = useMap();

    const refRouting = useRef(null);

    const graph = createGraph(props.edges);

    const [route, setRoute] = React.useState<Route>(undefined);

    useEffect(() =>{

        if(!routing){
            return;
        }

        if('request' !== routing.type){
            return;
        }

        // if position is empty, use entrance

        const currentEdge = props.edges.find((edge)=>{
            return (position.edgeId === edge.id)
        });

        const start = [
            currentEdge.startNode.id,
            currentEdge.endNode.id
        ]

        const routes:Route[] = []

        for(let i = 0, x = routing.destination.length; i < x; i += 1){

            for(let j = 0, y = start.length; j < y; j += 1){

                const dijkstra = new Dijkstra(
                    graph,
                    start[j] + '',
                    routing.destination[i] + '',
                );

                routes.push(dijkstra.getShortestRoute());

            }

        }

        routes.sort((a:Route, b:Route) => {
            if (a.length < b.length){
                return -1;
            }
            if (a.length > b.length) {
                return 1;
            }

            return 0;

        });

        const route = routes[0];

        let addOtherSideOfCurrentEdge = currentEdge.startNode.id + '';

        if(currentEdge.startNode.id + '' === route.nodes[0]){
            addOtherSideOfCurrentEdge = currentEdge.endNode.id + '';
        }

        route.nodes.unshift(addOtherSideOfCurrentEdge)

        dispatch({
            type: 'REQUEST_ROUTING',
            routing:{
                ...routing,
                type: 'response',
                start: {
                    ...position
                },
                route
            }
        });




    },[routing])

    useEffect(() => {

        const dijkstra = new Dijkstra(
            graph,
            606 + '',
            612 + '',
        );
        //return;
        setRoute(dijkstra.getShortestRoute());

    },[]);

    return (
        <g ref={refRouting}>
            <Edges
                edges={props.edges}
            />
            <ResolvePosition
                cartesianTransform={props.cartesianTransform}
            />
            <Routing
                edges={props.edges}
            />
            <Track />

            <Nodes
                nodes={props.nodes}
                route={route}
            />
        </g>
    );

}
