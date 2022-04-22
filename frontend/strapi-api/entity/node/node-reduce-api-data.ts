import {NodeSpore} from './node-spore';
import {NodeStrapi} from './node-strapi-interface';

export const nodeReduceApiData = (apiData: NodeStrapi):NodeSpore =>{

    const id = apiData.id;

    const IdFromEdges = apiData.attributes.IdFromEdges;
    const x = apiData.attributes.x;
    const y = apiData.attributes.y;

    let edgeStart:number[] = [];

    if (undefined !== apiData.attributes.graph_edges_starts) {

        edgeStart = apiData.attributes.graph_edges_starts.data.map((edge) => {
            return edge.id;
        });

    }

    let edgeEnd:number[] = [];

    if (undefined !== apiData.attributes.graph_edges_ends) {

        edgeEnd = apiData.attributes.graph_edges_ends.data.map((edge) => {
            return edge.id;
        });

    }

    let facility: number|null = null;

    /*
    if (undefined !== apiData.attributes.facility) {

        facility = apiData.attributes.facility.data?.id;

    }
     */

    if(!facility){
        facility = null;
    }

    const spore = {
        id,
        IdFromEdges,
        x,
        y,
        edgeStart,
        edgeEnd,
        facility,
    };

    return spore;
}
