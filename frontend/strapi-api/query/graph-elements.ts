import {Node} from '../entity/node/node';
import {getStrapi3Url} from '../utils/get-strapi-url';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {NodeStrapi} from '../entity/node/node-strapi-interface';
import {Edge} from '../entity/edge/edge';
import {EdgeStrapi} from '../entity/edge/edge-strapi-interface';

export const loadRelations = async (node:Node) => {
/*
    if(null !== mapElement.facilityRaw){

        if (false === Warehouse.get().hasFacility(mapElement.facilityRaw)) {
            await getFacilityById(mapElement.facilityRaw);
        }

    }
*/
}

export const getNodes = async ():Promise<Node[]> =>{

    const requestUrl = getStrapi3Url('/graph-nodes/?_limit=-1');

    const json = await getJsonFromApi<NodeStrapi[]>(requestUrl);

    const nodes = json.map(Node.fromApi);

    for(const mapElement of nodes){

        //await loadRelations(mapElement);

    }

    return nodes;

}

export const getEdges = async ():Promise<Edge[]> =>{

    const requestUrl = getStrapi3Url('/edges/?_limit=-1  ');

    const json = await getJsonFromApi<EdgeStrapi[]>(requestUrl);

    const edges = json.map(Edge.fromApi);

    for(const mapElement of edges){

        //await loadRelations(mapElement);

    }

    return edges;

}
export const getGraphElements = async () =>{

    await getNodes();
    await getEdges();

}