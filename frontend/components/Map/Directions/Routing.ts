interface Route {
    length: number;
    nodes:number[];
    finished:boolean;
}

export interface Neighbours {
    [key:number]: number
}

export interface RoutingGraph{
    [key:number]: Neighbours
}

export class Routing{

    private shortest:number = Infinity

    private routes:Route[] = [];

    constructor(
        private graph:RoutingGraph,
        private start:number,
        private end:number
    ) {

        const route:Route = {
            length:0,
            nodes:[start],
            finished:false
        };

        this.routes.push(route);

        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();
        this.route();

        console.table(this.routes)

    }

    public getRoutes(){
        return this.routes;
    }

    public getShortest(){
        return this.shortest;
    }

    private route(){

        for(const route of this.routes){

            if(true === route.finished){
                continue;
            }

            const currentId = route.nodes[route.nodes.length - 1];

            const current = this.graph[currentId];

            let numberOfNeighbours = 0;

            for(const neighbour in current){

                const neighbourId = parseInt(neighbour, 10);

                // prevent back and forth
                if(true === route.nodes.includes(neighbourId)){

                    continue;
                }

                numberOfNeighbours += 1;

                if(1 === numberOfNeighbours){

                    route.nodes.push(neighbourId);
                    route.length += current[neighbour];

                }
                else{

                    const fork:Route = {
                        length:route.length,
                        finished:false,
                        nodes: [
                            ...route.nodes
                        ]
                    };

                    fork.nodes.push(neighbourId);
                    fork.length += current[neighbour];

                    this.routes.push(fork)

                }

            }

        }

        for(const route of this.routes){

            const last = route.nodes[route.nodes.length - 1];

            if(this.end === last){

                route.finished = true;

                if(route.length < this.shortest){
                    this.shortest = route.length;
                }

                //console.log('hit', route, this.shortest)

            }

            if(route.length > this.shortest){
                route.finished = true;
            }

        }

        const atLeastOneUnfinished = this.routes.filter((route)=>{
            return (false === route.finished);
        });

        console.log(atLeastOneUnfinished);

    }

}