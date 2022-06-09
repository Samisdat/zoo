import {Entity, EntityType} from "../../strapi-api/entity/entity";
import {NodeJson} from "./node-json";
import {Facility} from "../facility/facility";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";

export class Node extends Entity<NodeJson>{

    get id(): number {
        return this.json.id;
    }

    get entityType(): EntityType {
        return 'Node';
    }

    get idFromEdges(): string{
        return this.json.IdFromEdges;
    }

    get x(): number{
        return this.json.x;
    }

    get y(): number{
        return this.json.y;
    }

    get edgeStartRaw(): number[]{
        return this.json.edgeStart;
    }

    /*
    get edgeStart(): Edge[]{

        return this.json.edgeStart.map((edgeId)=>{
            return Warehouse.get().getEdge(edgeId);
        });

    }

    get edgeEndRaw(): number[]{
        return this.json.edgeEnd
    }

    get edgeEnd(): Edge[]{

        return this.json.edgeEnd.map((edgeId)=>{
            return Warehouse.get().getEdge(edgeId);
        });
    }
    */
    get facilityRaw(): number{
        return this.json.facility;
    }

    get facilities(): Facility{

        return Warehouse.get().getFacility(this.facilityRaw);

    }

    static hydrate(dehydrated: NodeJson):Node{

        const node = new Node(dehydrated);

        return node;

    }

    static fromApi(json: any):Node{

        return undefined;

    }
}