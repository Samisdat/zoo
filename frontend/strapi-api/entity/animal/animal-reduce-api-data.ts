import {AnimalStrapi} from './animal-strapi-interface';
import {AnimalSpore} from './animal-spore';
import {Facility} from '../facility/facility';
import {FacilityStrapi} from '../facility/facility-strapi';
import {IUCN_STATI, IucnStatus} from './iucnStatus';

export const animalReduceApiData = (apiData: AnimalStrapi):AnimalSpore =>{

    const id = apiData.id;
    const slug = apiData.slug;
    const title = apiData.title;

    const wikidata = apiData.wikidata;
    const wikipediaLink = apiData.wikipediaLink;
    const scientificName = apiData.scientificName;
    const iucnID = apiData.iucnID;
    const iucnLink = apiData.iucnLink;
    let iucnStatus:IucnStatus = null;

    if(true === IUCN_STATI.includes(apiData.iucnStatus as IucnStatus)){
        iucnStatus = apiData.iucnStatus as IucnStatus;
    }

    const body = apiData.body;
    const className = apiData.className;
    const order = apiData.order;
    const species = apiData.species;
    const family = apiData.family;

    let profile:any[] = [];

    if (0 !== apiData.profile.length) {

        profile = apiData.profile;
    }


    let photos:number[] = [];

    if (undefined !== apiData.photos) {

        photos = apiData.photos.map((photo) => {
            return photo.id;
        });

    }

    let facilities:number[] = [];

    if (undefined !== apiData.facilities) {

        facilities = apiData.facilities.map((facilitiy:FacilityStrapi) => {
            return facilitiy.id;
        });

    }

    let individual_animals:number[] = [];
    if (undefined !== apiData.individual_animals) {

        individual_animals = apiData.individual_animals.map((individual_animal) => {
            return individual_animal.id;
        });

    }

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
        profile,
        individual_animals,
        facilities,
        photos,
    };
}
