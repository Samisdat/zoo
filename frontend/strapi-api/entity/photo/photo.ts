import {PhotoSize, PhotoSpore} from "./photo-spore";
import {PhotoStrapi} from "./photo-strapi";
import {Entity} from "../entity";
import {reducePhotoApiData} from "./photo-reduce-api-data";
import {Animal} from "../animal/animal";
import {AnimalSpore} from "../animal/animal-spore";
import {Facility} from "../facility/facility";
import {FacilitySpore} from "../facility/facility-spore";
import {Warehouse} from "../../warehouse/warehouse";
import {Position} from "../../../components/Map/Context/MapContext";

export class Photo extends Entity<PhotoSpore>{

    get id(): number {
        return this.json.id;
    }

    get title(): string{
        return this.json.title;
    }
    get copyright(): string{
        return this.json.copyright;
    }

    get thumbnail():PhotoSize | null{
        return this.json.thumbnail;
    }
    get large():PhotoSize | null{
        return this.json.large;
    }
    get medium():PhotoSize | null{
        return this.json.medium;
    }
    get small():PhotoSize | null{
        return this.json.small;
    }

    get focalPoint(): Position | null{
        return this.json.focalPoint;
    }

    get animal(): Animal | number | null{

        /*
        if(this.json.animal){
            return Animal.hydrate(this.json.animal as AnimalSpore);
        }
         */

        return null;
    }

    get facility(): Facility | number | null{

        /*
        if(this.json.facility){
            return Facility.hydrate(this.json.facility as FacilitySpore);
        }
         */

        return null;
    }

    static hydrate(dehydrated:PhotoSpore):Photo{

        const photo = new Photo(dehydrated);

        return photo;

    }

    static fromApi(json:PhotoStrapi):Photo{

        const dehydrated:PhotoSpore = reducePhotoApiData(json);

        const photo = new Photo(dehydrated);

        Warehouse.get().addPhoto(photo);

        return photo;

    }

}