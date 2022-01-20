interface Route {
    length: number;
    nodes:number[];
    finished:boolean;
}

export interface Neighbour {
    id: number,
    distance:number
}

export interface RoutingGraph{
    [key:number]: Neighbour[]
}

export class Routing{

    private shortest:Route = {
        finished:true,
        length:Infinity,
        nodes:[]
    };

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

        console.log(this.routes)

    }

    public getRoutes(){
        return this.routes;
    }

    public getShortest(){
        return this.shortest;
    }

    private route(){

        const routes:Route[] = [];

        for(const route of this.routes){

            if(true === route.finished){
                continue;
            }

            const currentId = route.nodes[route.nodes.length - 1];

            // @TODO sackgassen handling
            const current = this.graph[currentId];

            for(const index in current){

                const neighbour = current[index];

                // prevent back and forth
                if(true === route.nodes.includes(neighbour.id)){

                    // @TODO sackgassen handling
                    continue;

                }

                const fork:Route = {
                    length:route.length,
                    finished:false,
                    nodes: [
                        ...route.nodes
                    ]
                };

                fork.nodes.push(neighbour.id);
                console.log(fork.nodes, route.nodes)
                fork.length += neighbour.distance;

                routes.push(fork);


                //console.log(route)


            }

            //console.log(current);

            continue;
/*
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
        */
        }

        for(const route of routes){

            const last = route.nodes[route.nodes.length - 1];

            if(this.end === last){

                route.finished = true;

                if(route.length < this.shortest.length){
                    this.shortest = route;
                }

                console.log('hit', this.shortest)

            }

            if(route.length > this.shortest.length){
                route.finished = true;
            }

        }

        this.routes = routes.filter((route)=>{
            return (!route.finished);
        });

        /*
        const atLeastOneUnfinished = this.routes.filter((route)=>{
            return (false === route.finished);
        });

        console.log(atLeastOneUnfinished);

         */

    }

}