import {EdgeStrapi} from '../edge/edge-strapi-interface';

export interface NodeStrapi {
    id: number;
    attributes: {
        IdFromEdges: string;
        x: number;
        y: number;
        graph_edge_starts?: {
            data: EdgeStrapi[]
        };
        graph_edge_ends?: {
            data: EdgeStrapi[]
        };
    }
}
