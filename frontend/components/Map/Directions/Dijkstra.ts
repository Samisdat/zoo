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
        console.log('queue',this.queue)
        this.visitNode();
        console.log('queue',this.queue)
        this.visitNode();
        console.log('queue',this.queue)
        this.visitNode();
        console.log('queue',this.queue)
        this.visitNode();
        console.log('queue',this.queue)
        this.visitNode();
        console.log('queue',this.queue)
        this.visitNode();
        console.log('queue',this.queue)

        this.getShortestRoute();

        //console.log(this.visited)
        //console.log(JSON.stringify(this.nodeChecks, null, 4))



    }

    private addQueue(id){

        if(true === this.queue.includes(id)){
            console.log('schon drin')
            return;
        }

        this.queue.push(id);
    }

    private visitNode(){

        const nodeId = this.queue.shift();

        if(!nodeId){
            return;
        }

        const node = this.getNodeCheck(nodeId);

        const debug = ('F' === nodeId) ? true:false;

        if(true === debug){
            console.log('node ', nodeId, node)
        }

        for(const neighbor of this.graph[nodeId]){

            if(true === debug){
                console.log('debug', neighbor)
            }

            const neighborCheck = this.nodeChecks.find((nodeCheck)=>{
                return (neighbor.id === nodeCheck.id);
            });

            if(true === debug){
                console.log('debug', neighborCheck)
                console.log(
                    'distance',
                    neighbor.distance < neighborCheck.distance,
                    neighbor.id,
                    neighbor.distance, neighborCheck.distance
                )
            }

            console.log(
                (neighbor.distance + node.distance)  < neighborCheck.distance,
                (neighbor.distance + node.distance), neighborCheck.distance
            )

            if((neighbor.distance + node.distance)  < neighborCheck.distance){

                neighborCheck.distance = neighbor.distance + node.distance;
                neighborCheck.previous = nodeId;

            }

            this.addQueue(neighbor.id)

        }

        if(true === debug){
            console.log('debug', this.nodeChecks)
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

        console.log('jippia', current.distance)

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

        console.log(    route.reverse())

    }



}