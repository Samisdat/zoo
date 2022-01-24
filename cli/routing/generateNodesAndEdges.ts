import {Edge} from "./Edge";

const path = require("svg-path-properties");

import {SegmentAttributes} from "./getSegments";
import {Node,Nodes} from "./Node";

const createEdge = (segmentAttribute:SegmentAttributes):Edge => {

    const {id, d} = segmentAttribute;
    const properties = new path.svgPathProperties(segmentAttribute.d);
    const length = properties.getTotalLength();

    const startPos = properties.getPointAtLength(0);
    const endPos = properties.getPointAtLength(length);

    return new Edge(
        id,
        d,
        length,
        startPos,
        endPos
    );

};

export const generateNodesAndEdges = (segmentAttributes:SegmentAttributes[]):{
    nodes:Node[],
    edges:Edge[]
} => {

    const nodes = new Nodes();

    const edges = segmentAttributes.map(createEdge);

    for(const edge of edges){

        nodes.add(edge, edge.startPos, 'start');
        nodes.add(edge, edge.endPos, 'end');

    }

    return {
        nodes:nodes.getNodes(),
        edges
    };

}