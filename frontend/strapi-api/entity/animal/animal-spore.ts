import {IucnStatus} from "./iucnStatus";
import {AnimalProfileStrapi} from "./animal-strapi-interface";

export interface AnimalSpore {
    id: number;
    title: string;
    slug: string;
    wikidata: string;
    wikipediaLink: string;
    scientificName: string;
    iucnID: string;
    iucnLink: string;
    iucnStatus: IucnStatus | null;
    body: string;
    /* classname is empty|null by accident ;)*/
    className: string | null;
    order: string;
    species: string;
    family: string;
    profile:AnimalProfileStrapi[];
    individual_animals: number[];
    facilities: number[];
    photos: number[];
}