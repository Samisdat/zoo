export interface Route {
    length: number;
    nodes:string[];
    finished:boolean;
}

export interface Neighbour {
    id: string,
    distance:number
}

export interface RoutingGraph{
    [key:string]: Neighbour[]
}

interface NodeCheck{
    distance:number,
    id:string,
    previous:string | undefined;
}

export class Dijkstra{

    private queue: string[] = [];
    private visited:string[] = [];
    private nodeChecks:NodeCheck[] = [];

    private hops = 0;

    constructor(
        private graph:RoutingGraph,
        private start:string,
        private end:string
    ) {

        for(const nodeId in graph){

            const distance = (nodeId === start)? 0: Number.MAX_VALUE;

            this.nodeChecks.push(
                {
                    distance,
                    id:nodeId,
                    previous:undefined
                }
            )

        }

        this.queue.push(this.start);

        while (0 !== this.queue.length){

            this.visitNode();

            this.hops += 1;

            if(300 < this.hops){
                break;
            }

        }

    }

    private addQueue(id:string){

        if(true === this.queue.includes(id)){
            return;
        }

        if(true === this.visited.includes(id)){
            return;
        }

        this.queue.push(id);
    }

    private addVisited(id:string){

        if(true === this.visited.includes(id)){
            return;
        }

        this.visited.push(id);
    }

    private visitNode(){

        const nodeId = this.queue.shift();

        if(!nodeId){
            return;
        }

        if(true === this.visited.includes(nodeId)){
            return;
        }

        const node = this.getNodeCheck(nodeId);

        if(undefined === node){
            return;
        }

        for(const neighbor of this.graph[nodeId]){

            if(undefined === neighbor){
                continue;
            }

            const neighborCheck = this.nodeChecks.find((nodeCheck)=>{
                return (neighbor.id === nodeCheck.id);
            });

            if(undefined === neighborCheck){
                continue;
            }

            const neighborDistance = neighbor?.distance | 0;
            const nodeDistance = node?.distance | 0;
            const checkDistance = neighborCheck.distance;

            if((neighborDistance + nodeDistance)  < checkDistance){

                neighborCheck.distance = neighborDistance + nodeDistance;
                neighborCheck.previous = nodeId;

            }

            this.addQueue(neighbor.id)

        }

        this.addVisited(nodeId);

    }

    private getNodeCheck(nodeId:string){

        const previousNode = this.nodeChecks.find((nodeCheck)=>{
            return (nodeId === nodeCheck.id);
        });

        return previousNode;

    }

    public getShortestRoute():Route{

        let current = this.getNodeCheck(this.end);

        if(undefined === current){
            return undefined;
        }

        let distance = current.distance;
        let route = [current.id];

        while(true){

            if(undefined === current.previous){
                break;
            }

            current = this.getNodeCheck(current.previous);

            if(undefined === current || undefined === current.previous){
                break;
            }

            route.push(current.id);

            if(this.start === current.id){
                break;
            }

        }

        route.push(this.start);

        const shortestRoute: Route = {
            length: distance,
            nodes: route.reverse(),
            finished: true
        }

        return shortestRoute;

    }



}