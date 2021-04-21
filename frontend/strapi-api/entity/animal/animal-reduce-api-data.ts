import {AnimalStrapi} from "./animal-strapi-interface";
import {AnimalSpore} from "./animal-spore";

export const animalReduceApiData = (animalStrapi: AnimalStrapi):AnimalSpore =>{

    const id = animalStrapi.id;
    const slug = animalStrapi.slug;
    const title = animalStrapi.title;

    const wikidata = animalStrapi.wikidata;
    const wikipediaLink = animalStrapi.wikipediaLink;
    const scientificName = animalStrapi.scientificName;
    const iucnID = animalStrapi.iucnID;
    const iucnLink = animalStrapi.iucnLink;
    const iucnStatus = animalStrapi.iucnStatus;
    const body = animalStrapi.body;
    const className = animalStrapi.className;
    const order = animalStrapi.order;
    const species = animalStrapi.species;
    const family = animalStrapi.family;

    return{
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
        family,
    };
}
