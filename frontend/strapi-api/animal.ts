import {AnimalStrapiJson} from "./starpi-json-interfaces/animal";
import {AnimalDehydrated} from "./dehydrated-interfaces/animal";
import {ValueObject} from "./value-object";

export const reduceAnimalApiData = (apiData: AnimalStrapiJson):AnimalDehydrated =>{

    const id = apiData.id;
    const slug = apiData.slug;
    const title = apiData.title;

    const wikidata = apiData.wikidata;
    const wikipediaLink = apiData.wikipediaLink;
    const scientificName = apiData.scientificName;
    const iucnID = apiData.iucnID;
    const iucnLink = apiData.iucnLink;
    const iucnStatus = apiData.iucnStatus;
    const body = apiData.body;
    const className = apiData.className;
    const order = apiData.order;
    const species = apiData.species;
    const family = apiData.family;

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

export class Animal extends ValueObject<AnimalDehydrated>{

    get id(): number {
        return this.json.id;
    }

    get slug(): string{
        return this.json.slug
    }

    get title():string{
        return this.json.title;
    }
    get wikidata():string{
        return this.json.wikidata;
    }
    get wikipediaLink():string{
        return this.json.wikipediaLink;
    }
    get scientificName():string{
        return this.json.scientificName;
    }
    get iucnID():string{
        return this.json.iucnID;
    }
    get iucnLink():string{
        return this.json.iucnLink;
    }
    get iucnStatus():string{
        return this.json.iucnStatus;
    }
    get body():string{
        return this.json.body;
    }

    /* classname is empty|null by accident ;)*/
    get className():string | null{
        return this.json.className;
    }
    get order():string{
        return this.json.order;
    }
    get species():string{
        return this.json.species;
    }
    get family():string{
        return this.json.family;
    }

    static hydrate(dehydrated:AnimalDehydrated):Animal{

        const animal = new Animal(dehydrated);

        return animal;

    }

    static fromApi(json:AnimalStrapiJson):Animal{

        const dehydrated:AnimalDehydrated = reduceAnimalApiData(json);

        const animal = new Animal(dehydrated);

        return animal;

    }
}