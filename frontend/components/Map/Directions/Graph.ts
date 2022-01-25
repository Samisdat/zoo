
import {Dijkstra, RoutingGraph} from "./Dijkstra";

interface Node {
    id: string;
    x: number;
    y: number;
}

type NodePos = 'start' | 'end';

interface Edge {
    start: string;
    end: string;
    length: number;
}

interface NodesMapping{
    [key:string]: string
}

interface Route {
    start: number;
    end: number;
    length: number;
    nodes:number[];
}

interface Neighbours {
    [key:number]: number
}

interface Grap{
    [key:number]: Neighbours
}

export class Graph{

    private nextNodeId = 0;

    private edges:Edge[] = [];
    private nodes:Node[] = [];

    private nodesMapping: NodesMapping = {}

    private constructor(segments:d3.Selection<d3.BaseType, unknown, any, unknown>) {

        segments.each((d,i)=> {
            const path = segments.nodes()[i];
            this.addEdge(path);
        })

    }

    public addEdge(path:d3.BaseType){

        const pathElement = path as SVGGeometryElement;

        const pathId = pathElement.getAttribute('id').replace('_', '');


        const length = pathElement.getTotalLength();
        const startPos = pathElement.getPointAtLength(0);
        const endPos = pathElement.getPointAtLength(length);

        if('0694' === pathId){
            console.log(
                length,
                startPos,
                endPos
            );
        }


        let startNode = this.getNodeByPos(startPos.x, startPos.y);

        if(undefined === startNode){
            startNode = this.createNode(startPos.x, startPos.y, pathId, 'start');
        }

        let endNode = this.getNodeByPos(endPos.x, endPos.y);

        if(undefined === endNode){
            endNode = this.createNode(endPos.x, endPos.y, pathId, 'end');
        }

        const edge:Edge = {
            start: startNode.id,
            end: endNode.id,
            length
        };

        this.edges.push(edge);

    }

    public getNodes():Node[]{
        return this.nodes;
    }

    private reduceDecimals(num:number){

        return Math.floor(num)

    }

    private getNodeByPos(x:number, y:number):Node{

        const roundedX = this.reduceDecimals(x);
        const roundedY = this.reduceDecimals(y);

        const id = this.nodesMapping[`${roundedX}-${roundedY}`];

        const node = this.getNodeById(id);

        return node;

    }

    private getNodeById(id:string):Node{

        if (undefined === id){
            return undefined;
        }

        const node = this.nodes.find((node)=>{
            return (node.id === id);
        });

        return node;

    }


    private createNode(x:number, y:number, pathId:string, pos:NodePos):Node{

        const node:Node = {
            id: `${pathId}-${pos}`,
            x,
            y
        };

        this.nodes.push(node);

        const roundedX = this.reduceDecimals(x);
        const roundedY = this.reduceDecimals(y);

        this.nodesMapping[`${roundedX}-${roundedY}`] = node.id;

        return node;

    }

    private getNextNodeId():number{

        const id = this.nextNodeId;

        this.nextNodeId += 1;

        return id;

    }

    private getEdgesOnNode(id:string):Edge[]{

        const edges = this.edges.filter((edge)=>{
            return (edge.start === id || edge.end === id);
        });

        return edges;

    }


    public static get(segments:d3.Selection<d3.BaseType, unknown, any, unknown>){

        return new Graph(segments);

    }



    public getRoute(start:string, end:string){

        const graph:RoutingGraph = {}

        for(const edge of this.edges){

            if(undefined === graph[edge.start]){
                graph[edge.start] = [];
            }

            graph[edge.start].push({
                id:edge.end + '',
                distance:edge.length
            });

            if(undefined === graph[edge.end]){
                graph[edge.end] = [];
            }

            graph[edge.end].push({
                id:edge.start + '',
                distance:edge.length
            });

        }

        //console.log(JSON.stringify(graph))

        //return;

        const routing = new Dijkstra(
            graph,
            start + '',
            end + ''
        );

        return routing.getShortestRoute();


    }

}