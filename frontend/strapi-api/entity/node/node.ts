import {NodeSpore} from "./node-spore";
import {Entity} from "../entity";
import {Edge} from "../edge/edge";
import {Warehouse} from "../../warehouse/warehouse";
import {NodeStrapi} from "./node-strapi-interface";
import {nodeReduceApiData} from "./node-reduce-api-data";

export class Node extends Entity<NodeSpore>{

    get id(): number {
        return this.json.id;
    }

    get IdFromEdges(): string{
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

    static hydrate(dehydrated: NodeSpore):Node{

        const node = new Node(dehydrated);

        return node;

    }

    static fromApi(json: NodeStrapi):Node{

        const dehydrated: NodeSpore = nodeReduceApiData(json);

        const node = new Node(dehydrated);

        Warehouse.get().addNode(node);

        return node;

    }
}