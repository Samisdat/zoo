import {EdgeStrapi} from './edge-strapi-interface';
import {EdgeSpore} from './edge-spore';

export const edgeReduceApiData = (apiData: EdgeStrapi):EdgeSpore =>{

    const id = apiData.id;
    const IdFromSvg = apiData.attributes.IdFromSvg;
    const d = apiData.attributes.d;
    const edgeLength = apiData.attributes.edgeLength;
    const startNode = apiData.attributes.graph_node_start.data.id;
    const endNode = apiData.attributes.graph_node_end.data.id;

    const spore = {
        id,
        IdFromSvg,
        d,
        edgeLength,
        startNode,
        endNode,
    };

    return spore;
}
