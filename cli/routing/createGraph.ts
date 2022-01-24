import {Edge} from "./Edge";

const path = require("svg-path-properties");

import {SegmentAttributes} from "./getSegments";
import {Node, Nodes} from "./Node";

const createEdge = (segmentAttribute:SegmentAttributes):Edge => {

    const {id, d} = segmentAttribute;
    const properties = new path.svgPathProperties(segmentAttribute.d);
    const length = properties.getTotalLength();

    const startPos = properties.getPointAtLength(0);
    const endPos = properties.getPointAtLength(length);

    return{
        id,
        d,
        length,
        startPos,
        endPos
    };

};

export const createGraph = (segmentAttributes:SegmentAttributes[]) => {

    const nodes = new Nodes();

    const edges = segmentAttributes.map(createEdge);

    for(const edge of edges){

        nodes.add(edge.id, edge.startPos, 'start');
        nodes.add(edge.id, edge.endPos, 'end');

    }

    console.log(JSON.stringify(nodes, null, 4));

}