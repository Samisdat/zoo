import {IndividualAnimalSpore} from './individual-animal-spore';
import {Entity} from '../entity';

import {Warehouse} from '../../warehouse/warehouse';
import {IndividualAnimalStrapi} from './individual-animal-strapi-interface';
import {individualAnimalReduceApiData} from './individual-animal-reduce-api-data';
import {Animal} from '../animal/animal';
import {Photo} from "../../../graphql/photo/photo";

export class IndividualAnimal extends Entity<IndividualAnimalSpore>{

    get id(): number {
        return this.json.id;
    }

    get slug(): string{
        return this.json.slug
    }

    get name(): string{
        return this.json.name;
    }

    get body(): string{
        return this.json.body;
    }

    get animalRaw(): number{
        return this.json.animal;
    }

    get animal(): Animal | undefined{
        return Warehouse.get().getAnimal(this.json.animal);
    }

    get photosRaw(): number[]{
        return this.json.photos;
    }

    get photos(): Photo[]{
        return this.json.photos.map((photoId)=>{
            return Warehouse.get().getPhoto(photoId);
        });
    }

    static hydrate(dehydrated: IndividualAnimalSpore):IndividualAnimal{

        const individualAnimal = new IndividualAnimal(dehydrated);

        return individualAnimal;

    }

    static fromApi(json: IndividualAnimalStrapi):IndividualAnimal{

        const dehydrated: IndividualAnimalSpore = individualAnimalReduceApiData(json);

        const individualAnimal = new IndividualAnimal(dehydrated);

        Warehouse.get().addIndividualAnimal(individualAnimal);

        return individualAnimal;

    }
}