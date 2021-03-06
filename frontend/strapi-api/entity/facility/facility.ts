import {FacilitySpore, FacilityType} from "./facility-spore";
import {Entity} from "../entity";
import {facilityReduceApiData} from "./facility-reduce-api-data";
import {FacilityStrapi} from "./facility-strapi";
import {Warehouse} from "../../warehouse/warehouse";
import {Photo} from "../photo/photo";
import {Animal} from "../animal/animal";
import {MapElement} from "../map-element/map-element";

export class Facility extends Entity<FacilitySpore>{

    get id(): number {
        return this.json.id;
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

    get photosRaw(): number[]{
        return this.json.photos;
    }

    get photos(): Photo[]{
        return this.json.photos.map((photoId)=>{
            return Warehouse.get().getPhoto(photoId);
        });
    }

    get animalsRaw(): number[]{
        return this.json.animals;
    }

    get animals(): Animal[]{

        return this.json.animals.map((animalId)=>{
            return Warehouse.get().getAnimal(animalId);
        });
    }

    get mapElementsRaw(): number[]{
        return this.json.map_elements;
    }

    get mapElements(): MapElement[]{

        return this.json.map_elements.map((id)=>{
            return Warehouse.get().getMapElement(id);
        });
    }

    static hydrate(dehydrated:FacilitySpore):Facility{

        const facility = new Facility(dehydrated);

        return facility;

    }

    static fromApi(json:FacilityStrapi):Facility{

        const dehydrated:FacilitySpore = facilityReduceApiData(json);

        const facility = new Facility(dehydrated);

        Warehouse.get().addFacility(facility);

        return facility;

    }

}