import {Position} from "./Edge";

export type NodePos = 'start' | 'end';

interface NodeEdge{
    edgeId:string;
    posOnEdge:NodePos;
}

export class Node{

    private edges:NodeEdge[] = []

    constructor(private position:Position) {

    }

    public addEdge(edgeId:string, posOnEdge:NodePos){

        this.edges.push({
            edgeId,
            posOnEdge
        });

    }
}

interface NodesMapping{
    [key:string]: Node
}

export class Nodes{

    private nodes:Node[] = []

    private mapping:NodesMapping = {}

    constructor() {

    }

    private reduceDecimals(num:number){

        return Math.floor(num)

    }

    public add(edgeId:string, position:Position, posOnEdge:NodePos){

        const roundedX = this.reduceDecimals(position.x);
        const roundedY = this.reduceDecimals(position.y);

        const mappingKey = `${roundedX}-${roundedY}`;

        let node = this.mapping[mappingKey];

        if(undefined === node){

            node = new Node(position);
            this.mapping[mappingKey] = node;

        }

        node.addEdge(edgeId, posOnEdge);

    }
}