import {PhotoSize, PhotoSpore} from "./photo-spore";
import {PhotoStrapiJson} from "./photo-strapi";
import {Entity} from "../entity";
import {reducePhotoApiData} from "./photo-reduce-api-data";

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

    static hydrate(dehydrated:PhotoSpore):Photo{

        const photo = new Photo(dehydrated);

        return photo;

    }

    static fromApi(json:PhotoStrapiJson):Photo{

        const dehydrated:PhotoSpore = reducePhotoApiData(json);

        const photo = new Photo(dehydrated);

        return photo;

    }

}