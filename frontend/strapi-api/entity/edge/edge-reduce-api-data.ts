import {EdgeStrapi} from "./edge-strapi-interface";
import {EdgeSpore} from "./edge-spore";

export const edgeReduceApiData = (apiData: EdgeStrapi):EdgeSpore =>{

    const id = apiData.id;
    const IdFromSvg = apiData.IdFromSvg;
    const d = apiData.d;
    const edgeLength = apiData.edgeLength;
    const startNode = apiData.graph_node_start.id;
    const endNode = apiData.graph_node_end.id;

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
