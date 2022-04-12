import {Node} from '../entity/node/node';
import {getStrapi3Url, getStrapiUrl} from '../utils/get-strapi-url';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {NodeStrapi} from '../entity/node/node-strapi-interface';
import {Edge} from '../entity/edge/edge';
import {EdgeStrapi} from '../entity/edge/edge-strapi-interface';
import {Warehouse} from '../warehouse/warehouse';
import {getFacilityById} from './facilities';
import {getPhotoById} from './photos';
import {Animal} from '../entity/animal/animal';
import {AnimalStrapi} from '../entity/animal/animal-strapi-interface';

const qs = require('qs');

export const loadRelations = async (node:Node) => {

    if(null !== node.facilityRaw){

        if (false === Warehouse.get().hasFacility(node.facilityRaw)) {
            await getFacilityById(node.facilityRaw);
        }

    }

    if(null !== node.edgeStartRaw){

        for (const edgeId of node.edgeStartRaw) {

            if (false === Warehouse.get().hasEdge(edgeId)) {
                await getEdgeById(edgeId);
            }

        }

    }

    if(null !== node.edgeEndRaw){

        for (const edgeId of node.edgeEndRaw) {

            if (false === Warehouse.get().hasFacility(edgeId)) {
                await getEdgeById(edgeId);
            }

        }

    }

}

export const getNodeById = async (id: number):Promise<Node> =>{

    const query = qs.stringify({
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/graph-nodes/${id}?${query}`);

    const json = await getJsonFromApi<NodeStrapi>(requestUrl);

    const node = Node.fromApi(json);

    await loadRelations(node);

    return node;

}

export const getNodes = async ():Promise<Node[]> =>{

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/graph-nodes?${query}`);

    const json = await getJsonFromApi<NodeStrapi[]>(requestUrl);

    const nodes = json.map(Node.fromApi);

    console.log('nodes[0]', nodes[0]);

    for(const node of nodes){

        await loadRelations(node);

    }

    return nodes;

}

export const getEdgeById = async (id: number):Promise<Edge> =>{

    const query = qs.stringify({
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/graph-edges/${id}?${query}`);

    const json = await getJsonFromApi<EdgeStrapi>(requestUrl);

    const edge = Edge.fromApi(json);


    return edge;

}

export const getEdges = async ():Promise<Edge[]> =>{

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/graph-edges?${query}`);

    const json = await getJsonFromApi<EdgeStrapi[]>(requestUrl);

    const edges = json.map(Edge.fromApi);

    for(const edge of edges){

        //await loadRelations(edge);

    }

    return edges;

}
export const getGraphElements = async () =>{

    await getNodes();
    await getEdges();

}