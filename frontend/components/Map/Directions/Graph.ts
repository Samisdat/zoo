interface Node {
    id: number;
    x: number;
    y: number;
}

interface Edge {
    start: number;
    end: number;
    length: number;
}

interface NodesMapping{
    [key:string]: number
}

interface Route {
    start: number;
    end: number;
    length: number;
    nodes:number[];
}


export class Graph{

    private nextNodeId = 0;

    private edges:Edge[] = [];
    private nodes:Node[] = [];

    private nodesMapping: NodesMapping = {}

    private constructor(segments:d3.Selection<d3.BaseType, unknown, any, unknown>) {

        console.log('constructor')

        segments.each((d,i)=> {
            const path = segments.nodes()[i];
            this.addEdge(path);
        })

    }

    public addEdge(path:d3.BaseType){

        const pathElement = path as SVGGeometryElement;

        const length = pathElement.getTotalLength();
        const startPos = pathElement.getPointAtLength(0);
        const endPos = pathElement.getPointAtLength(length);

        let startNode = this.getNodeByPos(startPos.x, startPos.y);

        if(undefined === startNode){
            startNode = this.createNode(startPos.x, startPos.y);
        }


        let endNode = this.getNodeByPos(endPos.x, endPos.y);

        if(undefined === endNode){
            endNode = this.createNode(endPos.x, endPos.y);
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

        return Math.floor(num * 10)

    }

    private getNodeByPos(x:number, y:number):Node{

        const roundedX = this.reduceDecimals(x);
        const roundedY = this.reduceDecimals(y);

        const id = this.nodesMapping[`${roundedX}-${roundedY}`];

        const node = this.getNodeById(id);

        return node;

    }

    private getNodeById(id:number):Node{

        if (undefined === id){
            return undefined;
        }

        const node = this.nodes.find((node)=>{
            return (node.id === id);
        });

        return node;

    }


    private createNode(x:number, y:number):Node{

        const node:Node = {
            id: this.getNextNodeId(),
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

    private getEdgesOnNode(id:number):Edge[]{

        const edges = this.edges.filter((edge)=>{
            return (edge.start === id || edge.end === id);
        });

        console.log(edges);

        return edges;

    }


    public static get(segments:d3.Selection<d3.BaseType, unknown, any, unknown>){

        return new Graph(segments);

    }



    public getRoute(start:number, end:number){

        const routes = [];

        const startRoute:Route = {
            start,
            end,
            length:0,
            nodes:[start]
        }

        console.log(startRoute);

        console.log(this.getEdgesOnNode(start));


    }

}