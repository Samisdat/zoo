import {IndividualAnimalSpore} from "./individual-animal-spore";
import {IndividualAnimalStrapi} from "./individual-animal-strapi-interface";

export const individualAnimalReduceApiData = (apiData: IndividualAnimalStrapi):IndividualAnimalSpore =>{

    const id = apiData.id;
    const slug = apiData.slug;
    const name = apiData.name;
    const body = apiData.body;

    const animal = apiData.animal.id;

    let photos:number[] = [];

    if (undefined !== apiData.photos) {

        photos = apiData.photos.map((photo) => {
            return photo.id;
        });

    }

    return{
        id,
        name,
        slug,
        body,
        animal,
        photos,
    };
}
