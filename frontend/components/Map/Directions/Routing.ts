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
