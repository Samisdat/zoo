import {PhotoStrapi} from '../photo/photo-strapi';
import {AnimalStrapi} from '../animal/animal-strapi-interface';

export interface IndividualAnimalStrapi {
    id: number;
    attributes:{
        name: string;
        slug: string;
        body: string;
        animal?: {
            data:AnimalStrapi;
        };
        photos?: {
            data:PhotoStrapi[];
        };
    }
}
