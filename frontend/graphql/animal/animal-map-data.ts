import {IUCN_STATI, IucnStatus} from './iucnStatus';
import {AnimalJson} from "./animal-json";
import {Animal} from "./animal";
import {Entity} from "../../strapi-api/entity/entity";
import {photoMapData} from "../photo/photo-map-data";
import {individualAnimalMapData} from "../individual-animal/individual-animal-map-data";

export const animalMapData = (apiData: any):Entity<any>[] =>{

    const entities:Entity<any>[] = [];

    const id = parseInt(
        apiData.id,
        10
    );
    const slug = apiData.attributes.slug;
    const title = apiData.attributes.title;

    const wikidata = apiData.attributes.wikidata;
    const wikipediaLink = apiData.attributes.wikipediaLink;
    const scientificName = apiData.attributes.scientificName;
    const iucnID = apiData.attributes.iucnID;
    const iucnLink = apiData.attributes.iucnLink;

    let iucnStatus:IucnStatus | null = null;
    if(true === IUCN_STATI.includes(apiData.attributes.iucnStatus as IucnStatus)){
        iucnStatus = apiData.attributes.iucnStatus as IucnStatus;
    }

    const body = apiData.attributes.body;
    const className = apiData.attributes.className;
    const order = apiData.attributes.order;
    const species = apiData.attributes.species;
    const family = apiData.attributes.family;

    let profile:any[] = [];

    /*
    if (0 !== apiData.attributes.profile.length) {

        profile = apiData.attributes.profile;
    }
     */


    let photos:number[] = [];

    /*
    if (undefined !== apiData.attributes.photos) {

        photos = apiData.attributes.photos.data.map((photo) => {
            return photo.id;
        });

    }
     */

    let facilities:number[] = [];

    /*
    if (undefined !== apiData.attributes.facilities) {

        facilities = apiData.attributes.facilities.data.map((facilitiy:FacilityStrapi) => {
            return facilitiy.id;
        });

    }
     */

    let individual_animals:number[] = [];

    if (apiData.attributes.individual_animals) {

        individual_animals = apiData.attributes.individual_animals.data.map((individualAnimalsDatum)=>{

            const individualAnimalsEntities = individualAnimalMapData(individualAnimalsDatum);

            const individualAnimals = individualAnimalsEntities.find((entity)=>{
                return ('IndividualAnimal' === entity.entityType);
            });

            for(const entity of individualAnimalsEntities){
                entities.push(entity);
            }

            return individualAnimals.id;

        });

    }


    let headerImage:number | null = null;
    if (apiData.attributes.headerImg?.image?.data) {

        const photo = photoMapData(apiData.attributes.headerImg?.image?.data);

        entities.push(photo);

        headerImage = photo.id;

    }

    const json:AnimalJson = {
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
        profile,
        individual_animals,
        facilities,
        photos,
        headerImage,
    };

    const animal = Animal.hydrate(json);

    entities.push(animal);

    return entities;

}
