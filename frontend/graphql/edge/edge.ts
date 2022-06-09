import {Entity, EntityType} from "../../strapi-api/entity/entity";
import {EdgeJson} from "./edge-json";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {Node} from "../node/node";

export class Edge extends Entity<EdgeJson>{

    get id(): number {
        return this.json.id;
    }

    get entityType(): EntityType {
        return 'Edge';
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

    get startNodeRaw(): number | null{
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

    static hydrate(dehydrated: EdgeJson):Edge{

        const edge = new Edge(dehydrated);

        return edge;

    }

    static fromApi(json: any):Edge{

        return undefined;

    }
}