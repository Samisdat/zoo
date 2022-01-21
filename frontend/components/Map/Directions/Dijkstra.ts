import {RoutingGraph} from "./Routing";

interface NodeCheck{
    distance:number,
    id:string,
    previous:string | undefined;
}

export class Dijkstra{

    private queue: string[] = [];
    private visited:string[] = [];
    private nodeChecks:NodeCheck[] = [];

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

        this.queue.push('start');

        //console.log(JSON.stringify(this.nodeChecks, null, 4))

        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();

        this.getShortestRoute();

        console.log(this.visited)
        console.log(JSON.stringify(this.nodeChecks, null, 4))



    }

    private visitNode(){

        const nodeId = this.queue.shift();

        if(!nodeId){
            return;
        }

        if('A' === nodeId){
            console.log('debugg', nodeId)
        }

        for(const neighbor of this.graph[nodeId]){

            const neighborCheck = this.nodeChecks.find((nodeCheck)=>{
                return (neighbor.id === nodeCheck.id);
            });

            if(neighbor.distance < neighborCheck.distance){

                neighborCheck.distance = neighbor.distance;
                neighborCheck.previous = nodeId;

            }

            this.queue.push(neighbor.id);

        }

        this.visited.push(nodeId)


    }

    private getNodeCheck(nodeId:string){

        const previousNode = this.nodeChecks.find((nodeCheck)=>{
            return (nodeId === nodeCheck.id);
        });

        return previousNode;

    }

    private getShortestRoute(){

        let current = this.getNodeCheck(this.end);

        let distance = current.distance;
        let route = [current.id];

        while(true){

            current = this.getNodeCheck(current.previous);

            distance += current.distance;
            route.push(current.id);

            if(this.start === current.id){
                break;
            }

        }

        console.log(distance, route)

    }



}