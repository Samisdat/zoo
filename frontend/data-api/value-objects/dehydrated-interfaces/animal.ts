import {Data} from "../data";

export interface AnimalyDehydrated extends Data{
    _type: 'dehydrated';
    id: number;
    title: string;
    slug: string;
    wikidata: string;
    wikipediaLink: string;
    scientificName: string;
    iucnID: string;
    iucnLink: string;
    iucnStatus: string;
    body: string;
    /* classname is empty|null by accident ;)*/
    className: string | null;
    order: string;
    species: string;
    family: string;
    /*individual_animals: string;*/
    /*facilities: string;*/
    /*photos: string;*/
}