import {PostStrapi} from './post-strapi-interface';
import {PostSpore} from './post-spore';
import {FacilityStrapi} from '../facility/facility-strapi';

export const postReduceApiData = (apiData: PostStrapi):PostSpore =>{

    const id = apiData.id;
    const slug = apiData.attributes.slug;
    const title = apiData.attributes.title;
    const date = apiData.attributes.date;
    const body = apiData.attributes.body;

    let photos:number[] = [];

    if (undefined !== apiData.attributes.photos) {

        photos = apiData.attributes.photos.data.map((photo) => {
            return photo.id;
        });

    }

    let individual_animals:number[] = [];

    if (undefined !== apiData.attributes.individual_animals) {

        individual_animals = apiData.attributes.individual_animals.data.map((individual_animal) => {
            return individual_animal.id;
        });

    }

    let animals:number[] = [];

    /*
    if (undefined !== apiData.animals) {

        animals = apiData.animals.map((animals) => {
            return animals.id;
        });

    }
    */

    let facilities:number[] = [];

    if (undefined !== apiData.attributes.facilities) {

        facilities = apiData.attributes.facilities.data.map((facility:FacilityStrapi) => {
            return facility.id;
        });

    }

    return{
        id,
        title,
        slug,
        date,
        body,
        animals,
        individual_animals,
        facilities,
        photos,
    };
}
