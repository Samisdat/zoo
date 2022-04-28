import {FacilityJson, FacilityType} from './facility-json';

import {Entity, EntityType} from "../../strapi-api/entity/entity";
import {Photo} from "../photo/photo";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {Marker} from "../../strapi-api/entity/marker/marker";
import {Node} from "../../strapi-api/entity/node/node";
import {facilityMapData} from "./facility-map-data";
import {Animal} from "../animal/animal";

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

        console.log(
            this.json.headerImage,
            Warehouse.get().getPhotos(),
            Warehouse.get().getPhoto(this.json.headerImage)
        )

        return Warehouse.get().getPhoto(this.json.headerImage);

    }

    get photosRaw(): number[]{
        return this.json.photos;
    }

    get photos(): Photo[]{

        return [];
        /*
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
        */
    }

    get animalsRaw(): number[]{
        return this.json.animals;
    }

    get animals(): Animal[]{

        return [];

        /*
        return this.json.animals.map((animalId)=>{
            return Warehouse.get().getAnimal(animalId);
        });
         */
    }

    get markersRaw(): number[]{
        return this.json.markers;
    }

    get markers(): Marker[]{

        return [];

        /*
        return this.json.markers.map((id)=>{
            return Warehouse.get().getMarker(id);
        });
         */
    }

    get nodesRaw(): number[]{
        return this.json.nodes;
    }

    get nodes(): Node[]{

        return [];
        /*
        return this.json.nodes.map((id)=>{
            return Warehouse.get().getNode(id);
        });
         */
    }

    static hydrate(dehydrated:FacilityJson):Facility{

        const facility = new Facility(dehydrated);

        return facility;

    }

    static fromApi(json:any):Facility{

        const dehydrated:FacilityJson = facilityMapData(json);

        const facility = new Facility(dehydrated);

        return facility;

    }

}