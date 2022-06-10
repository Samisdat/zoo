import {Entity, EntityType} from "../../entity/entity";
import {MarkerJson} from "./marker-json";
import {Facility} from "../facility/facility";
import {Warehouse} from "../../warehouse/warehouse";

export class Marker extends Entity<MarkerJson>{

    get id(): number {
        return this.json.id;
    }

    get entityType(): EntityType {
        return 'Marker';
    }

    get slug(): string {
        return this.json.slug;
    }

    get x(): number {
        return this.json.x;
    }

    get y(): number {
        return this.json.y;
    }

    public dehydrate():MarkerJson {
        return this.json;
    }

    static hydrate(dehydrated:MarkerJson):Marker{

        const marker = new Marker(dehydrated);

        return marker;

    }

    static fromApi(json:any):Marker{

        return undefined;

    }

    get facilityRaw(): number  | null {

        return this.json.facility;
    }

    get facility(): Facility  | null{

        if(null === this.facilityRaw){
            return null;
        }

        return Warehouse.get().getFacility(this.facilityRaw);

    }

    get priority(): number {
        return this.json.priority;
    }

}