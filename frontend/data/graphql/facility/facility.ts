import {FacilityJson, FacilityType} from './facility-json';
import {Entity, EntityType} from "../../entity/entity";
import {Photo} from "../photo/photo";
import {Warehouse} from "../../warehouse/warehouse";
import {Animal} from "../animal/animal";
import {Marker} from "../marker/marker";
import {Node} from "../node/node";

export class Facility extends Entity<FacilityJson>{

    get id(): number {
        return this.json.id;
    }

    get entityType(): EntityType {
        return 'Facility';
    }

    get slug(): string{
        return this.json.slug
    }

    get title(): string{
        return this.json.title
    }

    get body(): string{
        return this.json.body;
    }

    get type(): FacilityType{
        return this.json.type;
    }

    get headerImageRaw(): number | null{

        return this.json.headerImage;

    }

    get headerImage(): Photo | null{

        return Warehouse.get().getPhoto(this.json.headerImage);

    }

    get animalsRaw(): number[]{
        return this.json.animals;
    }

    get animals(): Animal[]{

        return this.json.animals.map((animalId)=>{
            return Warehouse.get().getAnimal(animalId);
        });
        
    }

    get markersRaw(): number[]{
        return this.json.markers;
    }

    get markers(): Marker[]{

        return this.json.markers.map((id)=>{
            return Warehouse.get().getMarker(id);
        });

    }

    get nodesRaw(): number[]{
        return this.json.nodes;
    }

    get nodes(): Node[]{

        return this.json.nodes.map((id)=>{
            return Warehouse.get().getNode(id);
        });

    }

    static hydrate(dehydrated:FacilityJson):Facility{

        const facility = new Facility(dehydrated);

        return facility;

    }

    static fromApi(json:any):Facility{

        return null;

    }

}