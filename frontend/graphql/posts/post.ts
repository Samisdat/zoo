import {PostJson} from "./post-json";
import {Entity} from "../../strapi-api/entity/entity";
//import {Photo} from "../../strapi-api/entity/photo/photo";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";
//import {Facility} from "../../strapi-api/entity/facility/facility";
//import {Animal} from "../../strapi-api/entity/animal/animal";
//import {IndividualAnimal} from "../../strapi-api/entity/individual-animal/individual-animal";
import {postMapData} from "./post-map-data";

export class Post extends Entity<PostJson>{

    get id(): number {
        return this.json.id;
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

    get headerImageRaw(): number{

        return this.json.headerImage;

    }
    /*
    get headerImage(): Photo{

        return Warehouse.get().getPhoto(this.json.headerImage);

    }
    */

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

    static fromApi(json: any):Post{

        const dehydrated: PostJson = postMapData(json);

        console.log(dehydrated);

        const post = new Post(dehydrated);

        Warehouse.get().addPost(post);

        return post;

    }
}