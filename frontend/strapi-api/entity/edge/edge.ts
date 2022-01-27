import {Entity} from "../entity";
import {EdgeSpore} from "./edge-spore";
import {Warehouse} from "../../warehouse/warehouse";
import {EdgeStrapi} from "./edge-strapi-interface";
import {edgeReduceApiData} from "./edge-reduce-api-data";
import {Node} from "../node/node";

export class Edge extends Entity<EdgeSpore>{

    get id(): number {
        return this.json.id;
    }

    get IdFromSvg(): string{
        return this.json.IdFromSvg;
    }

    get d(): string{
        return this.json.d;
    }

    get edgeLength(): number{
        return this.json.edgeLength;
    }

    get startNodeRaw(): number{
        return this.json.startNode;
    }

    get startNode(): Node{
        return Warehouse.get().getNode(this.startNodeRaw);
    }

    get endNodeRaw(): number{
        return this.json.endNode;
    }

    get endNode(): Node{

        return Warehouse.get().getNode(this.endNodeRaw);
    }

    static hydrate(dehydrated: EdgeSpore):Edge{

        const qrCode = new Edge(dehydrated);

        return qrCode;

    }

    static fromApi(json: EdgeStrapi):Edge{

        const dehydrated: EdgeSpore = edgeReduceApiData(json);

        const edge = new Edge(dehydrated);

        Warehouse.get().addEdge(edge);

        return edge;

    }
}