import {Entity} from "../../strapi-api/entity/entity";
import {PhotoJson, PhotoSize} from "./photo-json";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {Position} from "../../components/Map/Context/MapContext";
import {photoMapData} from "./photo-map-data";

export class Photo extends Entity<PhotoJson>{

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

    static hydrate(dehydrated:PhotoJson):Photo{

        const photo = new Photo(dehydrated);

        return photo;

    }

    static fromApi(json:any):any{



        const dehydrated:PhotoJson = photoMapData(json);

        const photo = new Photo(dehydrated);

        return photo;

    }

}