import {NodeStrapi} from '../node/node-strapi-interface';

export interface EdgeStrapi {
    id:number;
    attributes:{
        IdFromSvg: string;
        d: string;
        edgeLength: number;
        graph_node_start?: {
            data:NodeStrapi
        };
        graph_node_end?: {
            data:NodeStrapi
        };
    }
}
