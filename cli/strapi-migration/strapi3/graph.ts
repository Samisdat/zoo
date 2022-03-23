import axios from "axios";
import {getUrl_3} from "./get-url";
import {Facility_3} from "./facility";

export interface Edge_3{
    id: number;
    IdFromSvg: string;
    d: string;
    edgeLength: number;
    graph_node_start: number;
    graph_node_end: number;
    created_at: string;
    updated_at: string;
}

export interface Node_3{
    id: number;
    IdFromEdges: string;
    x: number;
    y: number;
    facility: Facility_3 | null,
    created_at: string,
    updated_at: string,
    graph_edge_starts: Edge_3[],
    graph_edge_ends: Edge_3[]
}

export const getNodes_3 = async ():Promise<Node_3[]> => {

    const url = getUrl_3(`/graph-nodes/?_limit=-1`);

    const response = await axios.get(
        url
    );

    return (response.data as Node_3[]);

}

export const getEdges_3 =  (nodes:Node_3[]):Edge_3[] => {

    const ids: number[] = [];

    const edges:Edge_3[] = nodes.reduce((accumulator:any, currentValue:any, currentIndex:any, array:any)=>{

        if(!currentValue.graph_edge_starts){
            return accumulator;
        }

        let edges:any[] = [];

        edges = edges.concat(currentValue.graph_edge_starts);
        edges = edges.concat(currentValue.graph_edge_ends);

        for(let i = 0, x = edges.length; i < x; i += 1){

            const edge = edges[i];

            if(true === ids.includes(edge.id)){
                continue;
            }

            ids.push(edge.id);

            accumulator.push(
                {
                    ...edge
                }
            );

        }

        return accumulator;

    },[]);

    return edges;

}