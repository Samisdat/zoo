import {createGraph} from "./routing/createGraph";
import {readSvg} from "./routing/readSvg";
import {getSegments} from "./routing/getSegments";

console.log('routing');

const svg = readSvg();

const segments = getSegments(svg);

const graph = createGraph(segments);

console.log(graph)

