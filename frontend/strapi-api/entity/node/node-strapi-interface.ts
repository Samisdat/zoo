import {EdgeStrapi} from '../edge/edge-strapi-interface';
import {FacilityStrapi} from '../facility/facility-strapi';

export interface NodeStrapi {
    id: number;
    attributes: {
        IdFromEdges: string;
        x: number;
        y: number;
        graph_edges_starts?: {
            data: EdgeStrapi[];
        };
        graph_edges_ends?: {
            data: EdgeStrapi[];
        };
        facility?: {
            data: FacilityStrapi;
        };
    }
}
