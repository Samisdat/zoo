import {PhotoSize, PhotoSpore} from "./photo-spore";
import {PhotoStrapi} from "./photo-strapi";
import {animalReduceApiData} from "../animal/animal-reduce-api-data";
import {AnimalSpore} from "../animal/animal-spore";
import {AnimalStrapi} from "../animal/animal-strapi-interface";
import {FacilityStrapi} from "../facility/facility-strapi";
import {facilityReduceApiData} from "../facility/facility-reduce-api-data";

const sizeNames = [
    'thumbnail',
    'large',
    'medium',
    'small',
];

/**
 * DRY
 */
interface PhoteSizes{
    [index:string]: PhotoSize | null;
    thumbnail: PhotoSize | null;
    large: PhotoSize | null;
    medium: PhotoSize | null;
    small: PhotoSize | null;
}

export const reducePhotoApiData = (apiData: PhotoStrapi):PhotoSpore =>{

    const id = apiData.id;
    const title = apiData.title;
    const copyright = apiData.copyright;

    //const animal = apiData.animal?.id) as number || null;
    //const facility = apiData.facility?.id as number|| null;

    const thumbnail: PhotoSize | null = null;
    const small: PhotoSize | null = null;
    const medium: PhotoSize | null = null;
    const large: PhotoSize | null = null;

    const sizes:PhoteSizes = {
        thumbnail,
        small,
        medium,
        large
    };

    const formats = apiData.image?.formats;

    if(formats){

        for(const sizeName of sizeNames){

            if(formats[sizeName]){

                sizes[sizeName] = {
                    width: formats[sizeName].width,
                    height: formats[sizeName].height,
                    src: formats[sizeName].url
                }
            }

        }

    }

    const photoSpore: PhotoSpore = {
        id,
        title,
        copyright,
        //animal,
        //facility,
        thumbnail:sizes.thumbnail,
        small:sizes.small,
        medium:sizes.medium,
        large:sizes.large,
    };

    let animal = undefined;

    if(apiData.animal){

        animal = apiData.animal.id;

    }

    if(undefined !== animal){
        photoSpore.animal = animal;
    }

    let facility = undefined;

    if(apiData.facility){

        //facility = facilityReduceApiData(apiData.facility as FacilityStrapi)

    }

    if(undefined !== facility){
        photoSpore.facility = facility;
    }

    return photoSpore;
}
