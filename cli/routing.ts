import {generateNodesAndEdges} from "./routing/generateNodesAndEdges";
import {readSvg} from "./routing/readSvg";
import {getSegments} from "./routing/getSegments";
import {Node} from "./routing/Node";
import {Edge} from "./routing/Edge";

const axios = require('axios').default;

console.log('routing');

const svg = readSvg();

const segments = getSegments(svg);

const nodesAndEdges = generateNodesAndEdges(segments);

//console.log(JSON.stringify(nodesAndEdges.nodes[0], null, 4));
//console.log(JSON.stringify(nodesAndEdges.edges, null, 4));
//console.log(nodesAndEdges.edges[0].id, nodesAndEdges.edges[0].startNode?.id)


const protokoll = 'http://'
const domain = '127.0.0.1'
const port = '1337'

const getUrl = (path:string) => {

    const url = [
        protokoll,
        domain
    ];

    if(port){
        url.push(`:${port}`);
    }

    return url.join('') + path;

}

const checkNode = async (id:string): Promise<number | undefined> =>{

    const response = await axios.get(
        getUrl(`/graph-nodes/?IdFromEdges=${id}`)
    );

    const data = response.data;

    if(0 === data.length){
        return undefined;
    }

    return (response.data[0].id as number)

};

const saveNode = async (node:Node) =>{

    const id = node.id;

    if(undefined === id){
        throw Error('id should not be empty')
    }

    const strapiId = await checkNode(id);
    node.strapiId = strapiId;

    if(undefined === node.strapiId){

        const data:any = {
            "IdFromEdges": id,
            "graph_edge_starts": [],
            "graph_edge_ends": [],
            "x": node.position.x,
            "y": node.position.y,
            "created_by": "zoo/cli",
        };

        const strapiNode = await axios.post(
            getUrl(`/graph-nodes/`),
            data
        );

        node.strapiId = strapiNode.data.id;

    }
    else{

        const data:any = {
            "x": node.position.x,
            "y": node.position.y,
        };

        await axios.put(
            getUrl(`/graph-nodes/${node.strapiId}`),
            data
        );

    }

    return node;

};

const saveNodes = async (nodes:Node[]) =>{

    for(const node of nodes){
        await saveNode(node);
    }

};

const checkEdge = async (id:string): Promise<number | undefined> =>{

    const response = await axios.get(
        getUrl(`/edges/?IdFromSvg=${id}`)
    );

    const data = response.data;

    if(0 === data.length){
        return undefined;
    }

    return (response.data[0].id as number)

};

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


const saveGraph = async (nodesAndEdges:any) => {

    await saveNodes(nodesAndEdges.nodes);
    await saveEdges(nodesAndEdges.edges);
    
}

saveGraph(nodesAndEdges)






