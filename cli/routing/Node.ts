import {Edge, Position} from "./Edge";

export type NodePos = 'start' | 'end';

interface NodeEdge{
    edgeId:string;
    posOnEdge:NodePos;
}

export class Node{

    public strapiId:number | undefined = undefined

    private edges:NodeEdge[] = []

    constructor(public position:Position) {}

    public get id():string|undefined{

        if(0 === this.edges.length){
            return undefined;
        }

        const id = this.edges.map((edge:NodeEdge)=>{
            return `${edge.edgeId}_${edge.posOnEdge}`;
        });

        return id.join('-');

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

    public getNodes():Node[]{
        return this.nodes;
    }

    public add(edge:Edge, position:Position, posOnEdge:NodePos){

        const roundedX = this.reduceDecimals(position.x);
        const roundedY = this.reduceDecimals(position.y);

        const mappingKey = `${roundedX}-${roundedY}`;

        let node = this.mapping[mappingKey];

        if(undefined === node){

            node = new Node(position);
            this.nodes.push(node);
            this.mapping[mappingKey] = node;
        }

        node.addEdge(edge.id, posOnEdge);

        edge.addNode(node, posOnEdge);

    }

}