import {generateNodesAndEdges} from "./routing/generateNodesAndEdges";
import {readSvg} from "./routing/readSvg";
import {getSegments} from "./routing/getSegments";
import {Node} from "./routing/Node";
import {Edge} from "./routing/Edge";
import {getEdges_3, getNodes_3} from "./strapi-migration/strapi3/graph";
import {getFacilities_3} from "./strapi-migration/strapi3/facility";
import {getFacilities_4, getFacilityBySlug, updateFacility} from "./strapi-migration/strapi4/facility";
import {getEdges_4, getNodes_4} from "./strapi-migration/strapi4/graph";
import {getAnimals_3} from "./strapi-migration/strapi3/animal";
import {getMarkers_3, Marker_3} from "./strapi-migration/strapi3/marker";
import {createMarker, Marker_4, MarkerAttributes} from "./strapi-migration/strapi4/marker";

const axios = require('axios').default;

const qs = require('qs');

console.log('routing');

const svg = readSvg();

const segments = getSegments(svg);

const nodesAndEdges = generateNodesAndEdges(segments);

//console.log(JSON.stringify(nodesAndEdges.nodes[0], null, 4));
//console.log(JSON.stringify(nodesAndEdges.edges, null, 4));
//console.log(nodesAndEdges.edges[0].id, nodesAndEdges.edges[0].startNode?.id)


const protokoll = 'http://'
const domain = 'localhost'
const strapi3port = '1337'
const strapi4port = '1338'

export const getStrapi3Url = (path:string) => {

    const url = [
        protokoll,
        domain
    ];

    if(strapi3port){
        url.push(`:${strapi3port}`);
    }

    return url.join('') + path;

}

export const getStrapi4Url = (path:string) => {

    const url = [
        protokoll,
        domain
    ];

    if(strapi4port){
        url.push(`:${strapi4port}`);
    }

    return url.join('') + path;

}

const getGraphNodesFromStrapi3 = async (): Promise<any | undefined> =>{

    const url = getStrapi3Url(`/graph-nodes/?_limit=-1`);

    const response = await axios.get(
        url
    );

    const data = response.data;

    if(0 === data.length){
        return undefined;
    }

    return (response.data)

};

const getFacilitiesFromStrapi4 = async (): Promise<any | undefined> =>{

    const url = getStrapi4Url(`/api/facilities?pagination%5Blimit%5D=1000`);

    const response = await axios.get(
        url,
        {
            headers: {
                Authorization:
                    'Bearer d099dddcf1d9f7c05d45f48dbcb2576f41cea1a85de91d1607dec0bca4a80b90dd7e3a6799beefd654df34ba04832ec7eca2d0b8453badccff6bffd24a89a147572c61e419322e3a979b2ca3318484c247015c2ea66131be5ad676dfedfca287a6b8935aba1d7df74a895cfb3c7abe6208dce62fdbd32f8bdbf38ed18ad8f657',
            }
        }
    );

    const data = response.data;

    if(0 === data.length){
        return undefined;
    }

    return (response.data)

};

const getEdgesFromStrapi4 = async (): Promise<any | undefined> =>{

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const url = getStrapi4Url(`/api/graph-edges?${query}`);

    const response = await axios.get(
        url,
        {
            headers: {
                Authorization:
                    'Bearer d099dddcf1d9f7c05d45f48dbcb2576f41cea1a85de91d1607dec0bca4a80b90dd7e3a6799beefd654df34ba04832ec7eca2d0b8453badccff6bffd24a89a147572c61e419322e3a979b2ca3318484c247015c2ea66131be5ad676dfedfca287a6b8935aba1d7df74a895cfb3c7abe6208dce62fdbd32f8bdbf38ed18ad8f657',
            }
        }
    );

    const data = response.data;

    if(0 === data.length){
        return undefined;
    }

    return (response.data)

};

const saveGraphNode = async (graphNode:any): Promise<any | undefined> =>{

    const url = getStrapi4Url(`/api/graph-nodes`);

    const response = await axios.post(
        url,
        {data:graphNode, populate:'*'},
        {
            headers: {
                Authorization:
                    'Bearer d099dddcf1d9f7c05d45f48dbcb2576f41cea1a85de91d1607dec0bca4a80b90dd7e3a6799beefd654df34ba04832ec7eca2d0b8453badccff6bffd24a89a147572c61e419322e3a979b2ca3318484c247015c2ea66131be5ad676dfedfca287a6b8935aba1d7df74a895cfb3c7abe6208dce62fdbd32f8bdbf38ed18ad8f657',
            }
        }
    );

    console.log(response.data)

    return (response.data)

};

const saveGraphEdge = async (graphEdge:any): Promise<any | undefined> =>{

    const url = getStrapi4Url(`/api/graph-edges`);

    const response = await axios.post(
        url,
        {data:graphEdge},
        {
            headers: {
                Authorization:
                    'Bearer d099dddcf1d9f7c05d45f48dbcb2576f41cea1a85de91d1607dec0bca4a80b90dd7e3a6799beefd654df34ba04832ec7eca2d0b8453badccff6bffd24a89a147572c61e419322e3a979b2ca3318484c247015c2ea66131be5ad676dfedfca287a6b8935aba1d7df74a895cfb3c7abe6208dce62fdbd32f8bdbf38ed18ad8f657',
            }
        }
    );

    return (response.data)

};


/*
const saveEdge = async (edge:Edge) => {

    const strapiId = await checkEdge(edge.id);
    edge.strapiId = strapiId;

    const startNode = edge.startNode?.strapiId;
    const endNode = edge.endNode?.strapiId;

    if(!startNode || !endNode){
        throw Error('can not store relation for edge ' + edge.id);
    }

    if(undefined === edge.strapiId){

        const data:any = {
            "IdFromSvg": edge.id,
            "d": edge.d,
            "edgeLength": edge.length,
            "graph_node_start": startNode,
            "graph_node_end": endNode,
            "created_by": "zoo/cli",
        };

        const strapi = await axios.post(
            getUrl(`/edges/`),
            data
        );

        edge.strapiId = strapi.data.id;

    }
    else{

        const data:any = {
            "d": edge.d,
            "edgeLength": edge.length,
            "graph_node_start": startNode,
            "graph_node_end": endNode,
        };

        await axios.put(
            getUrl(`/edges/${edge.strapiId}`),
            data
        );

    }

    return edge;

};

const saveEdges = async (edges:Edge[]) =>{

    for(const edge of edges){
        await saveEdge(edge);
    }

};
*/

const migrate__stuff = async () => {

    const nodes_3 = await getNodes_3();
    const edges_3 = getEdges_3(nodes_3);
    const facilities_3 = await getFacilities_3();

    const facilities_4 = await getFacilities_4();

    const edges_4 = await getEdges_4();
    const nodes_4 = await getNodes_4();

    //console.log(facilities_3)
    //console.log(facilities_4)
    console.log(edges_4.at(0))
    console.log(nodes_4.at(0))
    return;

    const strapi3GraphNodes = await getGraphNodesFromStrapi3();


    const strapi4Facilities = await getFacilitiesFromStrapi4();
    const strapi4Edges = await getEdgesFromStrapi4();

        /*
    const ids: number[] = [];

    const graphEdges = strapi3GraphNodes.reduce((accumulator:any, currentValue:any, currentIndex:any, array:any)=>{

        if(!currentValue.graph_edge_starts){
            return accumulator;
        }

        let edges:any[] = [];

        edges = edges.concat(currentValue.graph_edge_starts);
        edges = edges.concat(currentValue.graph_edge_ends);

        for(let i = 0, x = edges.length; i < x; i += 1){

            const edge = edges[i];

            if(true === ids.includes(edge.id)){
                continue;
            }

            ids.push(edge.id);

            delete edge.id;
            delete edge.graph_node_start;
            delete edge.graph_node_end;
            delete edge.created_at;
            delete edge.updated_at;
            delete edge.facility;

            const foo = {
                ...edge
            };

            accumulator.push(foo);

        }

        //console.log(accumulator)


        return accumulator;

    },[]);


    console.log(graphEdges);


    for(const graphEdge of graphEdges){
        await saveGraphEdge(graphEdge);

    }
    */
    //console.log(graphEdges);


    for(const strapi3GraphNode of strapi3GraphNodes){

        //console.log(strapi3GraphNode)

        /*
        const graph_edge_starts = strapi3GraphNode.graph_edge_starts.map((edge:any)=>{

            const nodeStrapi4 = strapi4Edges.find((edge4:any)=>{

                console.log(edge, edge4)

                return false;

            })

        });

        console.log(graph_edge_starts[0], strapi3GraphNode.graph_edge_starts[0])
        */


        const graphNode:any = {
            IdFromEdges: strapi3GraphNode.IdFromEdges,
            x: strapi3GraphNode.x,
            y: strapi3GraphNode.y,
            //graph_edge_starts: strapi3GraphNode.graph_edge_starts,
            //graph_edge_ends: strapi3GraphNode.graph_edge_ends
        };

        if(strapi3GraphNode.facility){

            const facility = strapi4Facilities.data.find((facility:any)=>{
                return (facility.attributes.slug === strapi3GraphNode.facility.slug);
            });

            graphNode.facility = facility
        }

        if(strapi3GraphNode.graph_edge_starts){

            const graph_edge_starts = strapi3GraphNode.graph_edge_starts.map((edge:any)=>{

                const edge4 = strapi4Edges.data.find((edge4:any)=>{

                    return (edge.IdFromSvg === edge4.attributes.IdFromSvg);

                });

                return edge4.id;

            })

            graphNode.graph_edges_starts = graph_edge_starts;

        }

        if(strapi3GraphNode.graph_edge_ends){

            const graph_edge_ends = strapi3GraphNode.graph_edge_ends.map((edge:any)=>{

                const edge4 = strapi4Edges.data.find((edge4:any)=>{

                    return (edge.IdFromSvg === edge4.attributes.IdFromSvg);

                });

                return edge4.id;

            })

            graphNode.graph_edges_ends = graph_edge_ends;

        }

        await saveGraphNode(graphNode);

    }

}

const migrate = async () => {

    const markers_3 = await getMarkers_3();

    const facilities_4 = await getFacilities_4();

    for(const marker_3 of markers_3){

        const slug = marker_3?.facility?.slug || '';
        
        const facility = getFacilityBySlug(slug, facilities_4);

        if(!facility){

            continue
        }

        const marker_4:MarkerAttributes = {
            slug: marker_3.slug,
            x: marker_3.x,
            y: marker_3.y,
            priority: marker_3.priority,
            facility:facility.id
        }

        console.log(marker_4);

        if('kiosk-tigertal' === marker_4.slug){
            continue;
        }

        await createMarker(marker_4);

    }

    /*
    console.log(markers_3.at(0)?.facility);

    const slug = markers_3.at(0)?.slug || '';

    const facility = getFacilityBySlug(slug, facilities_4);

    console.log(facility);
    */
};

migrate();


