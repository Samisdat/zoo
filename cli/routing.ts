import {generateNodesAndEdges} from "./routing/generateNodesAndEdges";
import {readSvg} from "./routing/readSvg";
import {getSegments} from "./routing/getSegments";

console.log('routing');

const svg = readSvg();

const segments = getSegments(svg);

const nodesAndEdges = generateNodesAndEdges(segments);

console.log(JSON.stringify(nodesAndEdges.nodes[0], null, 4));

console.log(JSON.stringify(nodesAndEdges.edges[0], null, 4));
//console.log(nodesAndEdges.edges[0].id, nodesAndEdges.edges[0].startNode?.id)

