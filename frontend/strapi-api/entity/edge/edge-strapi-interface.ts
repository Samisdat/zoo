import {NodeStrapi} from "../node/node-strapi-interface";

export interface EdgeStrapi {
    id:number;
    IdFromSvg: string;
    d: string;
    edgeLength: number;
    graph_node_start: NodeStrapi;
    graph_node_end: NodeStrapi;
}
