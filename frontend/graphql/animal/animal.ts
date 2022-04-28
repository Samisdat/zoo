
import {AnimalJson} from './animal-json';

import {IucnStatus} from './iucnStatus';
import {Entity, EntityType} from "../../strapi-api/entity/entity";
import {Photo} from "../photo/photo";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {IndividualAnimal} from "../../strapi-api/entity/individual-animal/individual-animal";
import {Facility} from "../facility/facility";
import {animalMapData} from "./animal-map-data";

export class Animal extends Entity<AnimalJson>{

    get id(): number {
        return this.json.id;
    }

    get entityType(): EntityType {
        return 'Animal';
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
    get iucnStatus(): IucnStatus | null{
        return this.json.iucnStatus;
    }
    get body(): string{
        return this.json.body;
    }

    get className(): string | null{
        return this.json.className
    }

    get order(): string {
        return this.json.order
    }

    get family(): string {
        return this.json.family
    }
    /*
    get profile(): AnimalProfileStrapi[] {
        return this.json.profile;
    }
    */
    get species(): string {
        return this.json.species
    }

    get photosRaw(): number[]{
        return this.json.photos;
    }

    get photos(): (Photo|undefined)[]{

        return [];

        /*
        return this.json.photos.map((photoId)=>{
            return Warehouse.get().getPhoto(photoId);
        });
         */
    }

    get headerImageRaw(): number | null{

        return this.json.headerImage;

    }

    get headerImage(): Photo | null{

        return Warehouse.get().getPhoto(this.json.headerImage);

    }

    get individualAnimalsRaw(): number[]{
        return this.json.individual_animals;
    }

    get individualAnimals(): IndividualAnimal[]{

        return [];

        /*
        return this.json.individual_animals.map((individualAnimalId)=>{
            return Warehouse.get().getIndividualAnimal(individualAnimalId);
        });
         */
    }

    get facilitiesRaw(): number[]{
        return this.json.facilities;
    }

    get facilities(): Facility[]{

        return [];
        /*
        return this.json.facilities.map((facilityId)=>{
            return Warehouse.get().getFacility(facilityId);
        });
         */
    }


    static hydrate(dehydrated: AnimalJson):Animal{

        const animal = new Animal(dehydrated);

        return animal;

    }

    static fromApi(json: any):Entity<any>[]{

        return [];

    }
}