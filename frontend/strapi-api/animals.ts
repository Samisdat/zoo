import fetch from 'node-fetch';

import {getStrapiUrl} from "./utils/get-strapi-url";

export interface AnimalInterface{
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
    className: string;
    order: string;
    species: string;
    title_en: string;
    title_nl: string;
    title_de: string;
    family: string;
    published_at: string;
    created_at: string;
    updated_at: string;
    /*individual_animals: string;*/
    /*facilities: string;*/
    /*photos: string;*/
}

export const castAnimal = (rawAnimal:any):AnimalInterface => {

    const id = rawAnimal.id;
    const title = rawAnimal.title;
    const slug = rawAnimal.slug;
    const wikidata = rawAnimal.wikidata;
    const wikipediaLink = rawAnimal.wikipediaLink;
    const scientificName = rawAnimal.scientificName;
    const iucnID = rawAnimal.iucnID;
    const iucnLink = rawAnimal.iucnLink;
    const iucnStatus = rawAnimal.iucnStatus;
    const body = rawAnimal.body;
    const className = rawAnimal.class;
    const order = rawAnimal.order;
    const species = rawAnimal.species;
    const title_en = rawAnimal.title_en;
    const title_nl = rawAnimal.title_nl;
    const title_de = rawAnimal.title_de;
    const family = rawAnimal.family;
    const published_at = rawAnimal.published_at;
    const created_at = rawAnimal.created_at;
    const updated_at = rawAnimal.updated_at;

    const animal: AnimalInterface = {
        id,
        title,
        slug,
        wikidata,
        wikipediaLink,
        scientificName,
        iucnID,
        iucnLink,
        iucnStatus,
        body,
        className,
        order,
        species,
        title_en,
        title_nl,
        title_de,
        family,
        published_at,
        created_at,
        updated_at,
    };

    return animal;
}

export const getAnimalBySlug = async (slug: string, published:boolean = false):Promise<AnimalInterface[]> =>{

    const requestUrl = getStrapiUrl(`/animals?slug=${slug}`);

    const response = await fetch(requestUrl);
    const json = await response.json();

    const animal = json.map(castAnimal);

    return animal;

}
export const getAnimals = async (published:boolean = false):Promise<AnimalInterface[]> =>{

    const requestUrl = getStrapiUrl('/animals')

    const response = await fetch(requestUrl);
    const json = await response.json();

    const animals = json.map(castAnimal);

    return animals;

}