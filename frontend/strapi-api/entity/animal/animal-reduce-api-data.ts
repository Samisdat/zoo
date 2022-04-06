import {AnimalStrapi} from './animal-strapi-interface';
import {AnimalSpore} from './animal-spore';
import {Facility} from '../facility/facility';
import {FacilityStrapi} from '../facility/facility-strapi';
import {IUCN_STATI, IucnStatus} from './iucnStatus';

export const animalReduceApiData = (apiData: AnimalStrapi):AnimalSpore =>{

    const id = apiData.id;
    const slug = apiData.attributes.slug;
    const title = apiData.attributes.title;

    const wikidata = apiData.attributes.wikidata;
    const wikipediaLink = apiData.attributes.wikipediaLink;
    const scientificName = apiData.attributes.scientificName;
    const iucnID = apiData.attributes.iucnID;
    const iucnLink = apiData.attributes.iucnLink;
    let iucnStatus:IucnStatus = null;

    if(true === IUCN_STATI.includes(apiData.attributes.iucnStatus as IucnStatus)){
        iucnStatus = apiData.attributes.iucnStatus as IucnStatus;
    }

    const body = apiData.attributes.body;
    const className = apiData.attributes.className;
    const order = apiData.attributes.order;
    const species = apiData.attributes.species;
    const family = apiData.attributes.family;

    let profile:any[] = [];

    if (0 !== apiData.attributes.profile.length) {

        profile = apiData.attributes.profile;
    }


    let photos:number[] = [];

    if (undefined !== apiData.attributes.photos) {

        photos = apiData.attributes.photos.data.map((photo) => {
            return photo.id;
        });

    }

    let facilities:number[] = [];

    if (undefined !== apiData.attributes.facilities) {

        facilities = apiData.attributes.facilities.data.map((facilitiy:FacilityStrapi) => {
            return facilitiy.id;
        });

    }

    let individual_animals:number[] = [];
    if (undefined !== apiData.attributes.individual_animals) {

        individual_animals = apiData.attributes.individual_animals.data.map((individual_animal) => {
            return individual_animal.id;
        });

    }

    let headerImage:number = null;
    if (apiData.attributes.headerImg?.image?.data) {

        headerImage = apiData.attributes.headerImg.image.data.id;

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
        headerImage,
    };
}
