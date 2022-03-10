import {NodeSpore} from './node-spore';
import {NodeStrapi} from './node-strapi-interface';

export const nodeReduceApiData = (apiData: NodeStrapi):NodeSpore =>{

    const id = apiData.id;

    const IdFromEdges = apiData.IdFromEdges;
    const x = apiData.x;
    const y = apiData.y;

    let edgeStart:number[] = [];

    if (undefined !== apiData.graph_edge_starts) {

        edgeStart = apiData.graph_edge_starts.map((edge) => {
            return edge.id;
        });

    }

    let edgeEnd:number[] = [];

    if (undefined !== apiData.graph_edge_starts) {

        edgeEnd = apiData.graph_edge_ends.map((edge) => {
            return edge.id;
        });

    }

    const spore = {
        id,
        IdFromEdges,
        x,
        y,
        edgeStart,
        edgeEnd,
    };

    return spore;
}
