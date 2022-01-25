import {EdgeStrapi} from "../edge/edge-strapi-interface";

export interface NodeStrapi {
    id: number;
    IdFromEdges: string;
    x: number;
    y: number;
    graph_edge_starts: EdgeStrapi[];
    graph_edge_ends: EdgeStrapi[];
}
