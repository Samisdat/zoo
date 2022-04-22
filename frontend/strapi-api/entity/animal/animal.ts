import {AnimalProfileStrapi, AnimalStrapi} from './animal-strapi-interface';
import {AnimalSpore} from './animal-spore';
import {Entity} from '../entity';
import {animalReduceApiData} from './animal-reduce-api-data';
import {Warehouse} from '../../warehouse/warehouse';
import {IndividualAnimal} from '../individual-animal/individual-animal';

import {IucnStatus} from './iucnStatus';
import {Photo} from "../../../graphql/photo/photo";
import {Facility} from "../../../graphql/facility/facility";

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

    get profile(): AnimalProfileStrapi[] {
        return this.json.profile;
    }

    get species(): string {
        return this.json.species
    }

    get photosRaw(): number[]{
        return this.json.photos;
    }

    get photos(): Photo[]{

        return this.json.photos.map((photoId)=>{
            return Warehouse.get().getPhoto(photoId);
        });
    }

    get headerImageRaw(): number{

        return this.json.headerImage;

    }

    set headerImageRaw(id:number){

        this.json.headerImage = id;

    }

    get headerImage(): Photo{

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


    static hydrate(dehydrated: AnimalSpore):Animal{

        const animal = new Animal(dehydrated);

        return animal;

    }

    static fromApi(json: AnimalStrapi):Animal{

        const dehydrated: AnimalSpore = animalReduceApiData(json);

        const animal = new Animal(dehydrated);

        Warehouse.get().addAnimal(animal);

        return animal;

    }
}