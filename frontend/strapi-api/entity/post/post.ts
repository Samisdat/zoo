import {Entity} from "../entity";
import {PostSpore} from "./post-spore";
import {Photo} from "../photo/photo";
import {IndividualAnimal} from "../individual-animal/individual-animal";
import {Warehouse} from "../../warehouse/warehouse";
import {Animal} from "../animal/animal";
import {Facility} from "../facility/facility";
import {postReduceApiData} from "./post-reduce-api-data";
import {PostStrapi} from "./post-strapi-interface";

export class Post extends Entity<PostSpore>{

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

    get photosRaw(): number[]{
        return this.json.photos;
    }

    get photos(): Photo[]{
        return this.json.photos.map((photoId)=>{
            return Warehouse.get().getPhoto(photoId);
        });
    }

    get facilitiesRaw(): number[]{
        return this.json.facilities;
    }

    get facilities(): Facility[]{
        return this.json.facilities.map((facilityId)=>{
            return Warehouse.get().getFacility(facilityId);
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

    get individualAnimalsRaw(): number[]{
        return this.json.individual_animals;
    }

    get individualAnimals(): IndividualAnimal[]{
        return this.json.individual_animals.map((individualAnimalId)=>{
            return Warehouse.get().getIndividualAnimal(individualAnimalId);
        });
    }

    static hydrate(dehydrated: PostSpore):Post{

        const animal = new Post(dehydrated);

        return animal;

    }

    static fromApi(json: PostStrapi):Post{

        const dehydrated: PostSpore = postReduceApiData(json);

        const post = new Post(dehydrated);

        Warehouse.get().addPost(post);

        return post;

    }
}