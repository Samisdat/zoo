import {PhotoStrapi} from '../photo/photo-strapi';
import {IndividualAnimalStrapi} from '../individual-animal/individual-animal-strapi-interface';
import {AnimalStrapi} from '../animal/animal-strapi-interface';
import {FacilityStrapi} from '../facility/facility-strapi';

export interface PostStrapi {
    id: number;
    attributes:{
        slug: string;
        title: string;
        body: string;
        date: string;
        animals?: {
            data:AnimalStrapi[];
        };
        individual_animals?:{
            data: IndividualAnimalStrapi[];
        }
        facilities?: {
            data: FacilityStrapi[];
        };
        photos?: {
            data:PhotoStrapi[];
        };

    }
}
