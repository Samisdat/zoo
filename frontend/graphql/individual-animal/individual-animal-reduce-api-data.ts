import {IndividualAnimalSpore} from './individual-animal-spore';
import {IndividualAnimalStrapi} from './individual-animal-strapi-interface';

export const individualAnimalReduceApiData = (apiData: IndividualAnimalStrapi):IndividualAnimalSpore =>{

    const id = apiData.id;
    const slug = apiData.attributes.slug;
    const name = apiData.attributes.name;
    const body = apiData.attributes.body;

    const animal = apiData.attributes?.animal?.data?.id;

    /*
    let photos:number[] = [];

    if (undefined !== apiData.attributes.photos) {

        photos = apiData.attributes.photos.data.map((photo) => {
            return photo.id;
        });

    }
     */

    return{
        id,
        name,
        slug,
        body,
        animal,
        photos:[],
    };
}
