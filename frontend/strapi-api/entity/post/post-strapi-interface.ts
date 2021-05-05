import {PhotoStrapi} from "../photo/photo-strapi";
import {IndividualAnimalStrapi} from "../individual-animal/individual-animal-strapi-interface";
import {AnimalStrapi} from "../animal/animal-strapi-interface";
import {FacilityStrapi} from "../facility/facility-strapi";

export interface PostStrapi {
    id: number;
    slug: string;
    title: string;
    body: string;
    individual_animals: IndividualAnimalStrapi[];
    animals: AnimalStrapi[];
    facilities: FacilityStrapi[];
    photos: PhotoStrapi[];
    published_at: string;
}
