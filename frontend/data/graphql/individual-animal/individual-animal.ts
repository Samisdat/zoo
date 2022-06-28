import {IndividualAnimalJson} from './individual-animal-json';
import {Animal} from '../animal/animal';
import {Photo} from '../photo/photo';
import {Entity, EntityType} from '../../entity/entity';
import {Warehouse} from '../../warehouse/warehouse';

export class IndividualAnimal extends Entity<IndividualAnimalJson>{

    get id(): number {
        return this.json.id;
    }

    get entityType(): EntityType {
        return 'IndividualAnimal';
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

    static hydrate(dehydrated: IndividualAnimalJson):IndividualAnimal{

        const individualAnimal = new IndividualAnimal(dehydrated);

        return individualAnimal;

    }

    static fromApi(json: any):Entity<any>[]{

        return [];

    }
}