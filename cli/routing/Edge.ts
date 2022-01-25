import {Node, NodePos} from "./Node";

export interface Position{
    x:number;
    y:number;
}

export class Edge{

    public strapiId:number | undefined = undefined

    public id: string;
    public d: string;
    public length: number;
    public startPos: Position;
    public endPos: Position;

    public startNode: Node | undefined = undefined;
    public endNode: Node | undefined = undefined;

    public constructor(
        id: string,
        d: string,
        length: number,
        startPos:Position,
        endPos:Position
    ) {

        this.id = id;
        this.d = d;
        this.length = Math.round(length);
        this.startPos = {
            x: Math.round(startPos.x),
            y: Math.round(startPos.y),
        };
        this.endPos = {
            x: Math.round(endPos.x),
            y: Math.round(endPos.y),
        };

    }

    public addNode(node: Node, posOnEdge:NodePos){

        if('start' === posOnEdge){
            this.startNode = node;
        }
        else{
            this.endNode = node;
        }
    }

}