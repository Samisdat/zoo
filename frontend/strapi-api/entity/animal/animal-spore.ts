import {IucnStatus} from "./iucnStatus";

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
    individual_animals: number[];
    facilities: number[];
    photos: number[];
}