import {AnimalStrapi} from "./animal-strapi-interface";
import {AnimalSpore} from "./animal-spore";
import {Entity} from "../entity";
import {animalReduceApiData} from "./animal-reduce-api-data";
import {Warehouse} from "../../warehouse/warehouse";
import {Photo} from "../photo/photo";

export class Animal extends Entity<AnimalSpore>{

    get id(): number {
        return this.json.id;
    }

    get slug(): string{
        return this.json.slug
    }

    get title(): string{
        return this.json.title;
    }
    get wikidata(): string{
        return this.json.wikidata;
    }
    get wikipediaLink(): string{
        return this.json.wikipediaLink;
    }
    get scientificName(): string{
        return this.json.scientificName;
    }
    get iucnID():  string{
        return this.json.iucnID;
    }
    get iucnLink(): string{
        return this.json.iucnLink;
    }
    get iucnStatus(): string{
        return this.json.iucnStatus;
    }
    get body(): string{
        return this.json.body;
    }

    /* classname is empty|null by accident ;)*/
    get className():string | null{
        return this.json.className;
    }
    get order(): string{
        return this.json.order;
    }
    get species(): string{
        return this.json.species;
    }
    get family(): string{
        return this.json.family;
    }

    get photosRaw(): number[]{
        return this.json.photos;
    }

    get photos(): Photo[]{
        return this.json.photos.map((photoId)=>{
            return Warehouse.get().getPhoto(photoId);
        });
    }

    static hydrate(dehydrated: AnimalSpore):Animal{

        const animal = new Animal(dehydrated);

        return animal;

    }

    static fromApi(json: AnimalStrapi):Animal{

        const dehydrated: AnimalSpore = animalReduceApiData(json);

        const animal = new Animal(dehydrated);

        console.log(Warehouse.get().hasAnimal(animal.id))

        Warehouse.get().addAnimal(animal);

        console.log(Warehouse.get().hasAnimal(animal.id))

        return animal;

    }
}