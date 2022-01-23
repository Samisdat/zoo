import {RoutingGraph, Route} from "./Routing";


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
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();
        this.visitNode();

        console.log(JSON.stringify(this.nodeChecks, null, 4));
        return;


        //console.log(JSON.stringify(this.nodeChecks, null, 4))
        return
        while (0 !== this.queue.length){
            console.log('queue',this.queue.length);
            this.visitNode();

            this.hops += 1;

            if(300 < this.hops){
                break;
            }

        }

        /*
        console.log(JSON.stringify(
            this.getShortestRoute()
        ));
         */

        console.log(this.visited)
        //console.log(JSON.stringify(this.nodeChecks, null, 4))



    }

    private check(){

        console.log('gecheckte ', this.nodeChecks.filter((nodeCheck)=>{

            return (nodeCheck.distance !== Number.MAX_VALUE)


        }).length)

        console.log('besuchte ', this.visited)


    }

    private addQueue(id:string){

        if(true === this.queue.includes(id)){
            console.log('schon in der queue');
            return;
        }

        if(true === this.visited.includes(id)){
            console.log('schon da gewesen');
            return;
        }

        this.queue.push(id);
    }

    private addVisited(id:string){

        console.log('addVisited', id)

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
            console.log('schon besucht')
            return;
        }

        const node = this.getNodeCheck(nodeId);

        if(undefined === node){
            return;
        }

        const debug = ('F' === nodeId) ? true:false;

        if(true === debug){
            console.log('node ', nodeId, node)
        }

        for(const neighbor of this.graph[nodeId]){

            if(undefined === neighbor){
                continue;
            }

            if(true === debug){
                console.log('debug', neighbor)
            }

            const neighborCheck = this.nodeChecks.find((nodeCheck)=>{
                return (neighbor.id === nodeCheck.id);
            });

            console.log('neighborCheck', neighborCheck)

            if(undefined === neighborCheck){
                continue;
            }

            if(true === debug){
                console.log('debug', neighborCheck)
                console.log(
                    'distance',
                    undefined !== neighborCheck && neighbor.distance < neighborCheck.distance,
                    neighbor.id,
                    neighbor.distance,
                    neighborCheck?.distance
                )
            }

            const neighborDistance = neighbor?.distance | 0;
            const nodeDistance = node?.distance | 0;
            const checkDistance = neighborCheck.distance;

            console.log(neighborDistance, nodeDistance, checkDistance)

            if((neighborDistance + nodeDistance)  < checkDistance){

                neighborCheck.distance = neighborDistance + nodeDistance;
                neighborCheck.previous = nodeId;

            }

            console.log(neighborCheck)

            this.addQueue(neighbor.id)
            console.log('Queue', this.queue)

        }

        if(true === debug){
            //console.log('debug', JSON.stringify(this.nodeChecks, null, 4))
        }


        this.addVisited(nodeId);

        this.check();

    }

    private getNodeCheck(nodeId:string){

        const previousNode = this.nodeChecks.find((nodeCheck)=>{
            return (nodeId === nodeCheck.id);
        });

        return previousNode;

    }

    public getShortestRoute(){

        let current = this.getNodeCheck(this.end);

        if(undefined === current){
            return undefined;
        }

        console.log('jippia', current.distance)

        let distance = current.distance;
        let route = [current.id];

        while(true){

            if(undefined === current.previous){
                console.log(current)
                break;
            }

            current = this.getNodeCheck(current.previous);

            if(undefined === current || undefined === current.previous){
                console.log(current?.previous)
                break;
            }


            route.push(current.id);

            if(this.start === current.id){
                break;
            }

        }

        const shortestRoute: Route = {
            length: distance,
            nodes: route.reverse(),
            finished: true
        }

        return shortestRoute;

    }



}