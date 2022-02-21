import {FacilitySpore, FacilityType} from "./facility-spore";
import {Entity} from "../entity";
import {facilityReduceApiData} from "./facility-reduce-api-data";
import {FacilityStrapi} from "./facility-strapi";
import {Warehouse} from "../../warehouse/warehouse";
import {Photo} from "../photo/photo";
import {Animal} from "../animal/animal";
import {Node} from "../node/node";
import {Marker} from "../marker/marker";

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

        if(this.json.photos && 0 !== this.json.photos.length){

            return this.json.photos.map((photoId)=>{
                return Warehouse.get().getPhoto(photoId);
            });

        }

        if(this.animals){

            const photos = [];

            for(const animal of this.animals){

                for(const photo of animal.photos){

                    photos.push(photo);

                }

            }

            return photos;

        }

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