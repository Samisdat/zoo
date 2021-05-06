import {PhotoStrapi} from "../photo/photo-strapi";
import {AnimalStrapi} from "../animal/animal-strapi-interface";

export interface IndividualAnimalStrapi {
    id: number;
    name: string;
    slug: string;
    body: string;
    animal: AnimalStrapi;
    photos: PhotoStrapi[];
}
