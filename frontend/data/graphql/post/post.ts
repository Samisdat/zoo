import {Entity, EntityType} from '../../entity/entity';
import {PostJson} from './post-json';
import {Photo} from '../photo/photo';
import {Warehouse} from '../../warehouse/warehouse';
import {Content} from "./content-map-data";

export class Post extends Entity<PostJson>{

    get id(): number {
        return this.json.id;
    }

    get entityType(): EntityType {
        return 'Post';
    }

    get slug(): string{
        return this.json.slug
    }

    get title(): string{
        return this.json.title;
    }

    get date(): string{
        return this.json.date;
    }

    get body(): string{
        return this.json.body;
    }

    get content(): Content[]{
        return this.json.content;
    }

    get headerImageRaw(): number | null | undefined{

        return this.json.headerImage;

    }

    get headerImage(): Photo | null | undefined {

        return Warehouse.get().getPhoto(this.json.headerImage);

    }

    get facilitiesRaw(): number[]{
        return this.json.facilities;
    }

    /*
    get facilities(): Facility[]{
        return this.json.facilities.map((facilityId)=>{
            return Warehouse.get().getFacility(facilityId);
        });
    }
     */

    get animalsRaw(): number[]{
        return this.json.animals;
    }

    /*
    get animals(): Animal[]{
        return this.json.animals.map((animalId)=>{
            return Warehouse.get().getAnimal(animalId);
        });
    }
    */
    get individualAnimalsRaw(): number[]{
        return this.json.individual_animals;
    }

    /*
    get individualAnimals(): IndividualAnimal[]{
        return this.json.individual_animals.map((individualAnimalId)=>{
            return Warehouse.get().getIndividualAnimal(individualAnimalId);
        });
    }
     */

    static hydrate(dehydrated: PostJson):Post{

        const post = new Post(dehydrated);

        return post;

    }

    static fromApi(json: any):Post | undefined{

        return undefined;

    }
}