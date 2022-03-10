import {PostStrapi} from './post-strapi-interface';
import {PostSpore} from './post-spore';
import {FacilityStrapi} from '../facility/facility-strapi';

export const postReduceApiData = (apiData: PostStrapi):PostSpore =>{

    const id = apiData.id;
    const slug = apiData.slug;
    const title = apiData.title;
    const date = apiData.published_at;
    const body = apiData.body;

    let photos:number[] = [];

    if (undefined !== apiData.photos) {

        photos = apiData.photos.map((photo) => {
            return photo.id;
        });

    }

    let individual_animals:number[] = [];

    if (undefined !== apiData.individual_animals) {

        individual_animals = apiData.individual_animals.map((individual_animal) => {
            return individual_animal.id;
        });

    }

    let animals:number[] = [];

    if (undefined !== apiData.animals) {

        animals = apiData.animals.map((animals) => {
            return animals.id;
        });

    }

    let facilities:number[] = [];

    if (undefined !== apiData.facilities) {

        facilities = apiData.facilities.map((facility:FacilityStrapi) => {
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
