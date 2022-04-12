import {PhotoSize, PhotoSpore} from './photo-spore';
import {PhotoStrapi} from './photo-strapi';
import {animalReduceApiData} from '../animal/animal-reduce-api-data';
import {AnimalSpore} from '../animal/animal-spore';
import {AnimalStrapi} from '../animal/animal-strapi-interface';
import {FacilityStrapi} from '../facility/facility-strapi';
import {facilityReduceApiData} from '../facility/facility-reduce-api-data';
import {Position} from '../../../components/Map/Context/MapContext';

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
    const imageId = apiData.attributes.image?.data?.id || null;

    const title = apiData.attributes.title;
    const copyright = apiData.attributes.copyright || null;

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

    const formats = apiData.attributes.image?.data.attributes.formats;

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

    if(!apiData.attributes.x){
        apiData.attributes.x = 50;
    }

    if(!apiData.attributes.y){
        apiData.attributes.y = 50;
    }

    const focalPoint: Position = {
        x: apiData.attributes.x,
        y: apiData.attributes.y,
    };


    const photoSpore: PhotoSpore = {
        id,
        imageId,
        title,
        copyright,
        //animal,
        //facility,
        thumbnail: sizes.thumbnail,
        small: sizes.small,
        medium: sizes.medium,
        large: sizes.large,
        focalPoint
    };

    const animal = undefined;

    /*
    if(apiData.animal){

        animal = apiData.animal.id;

    }
    */
    if(undefined !== animal){
        photoSpore.animal = animal;
    }

    const facility = undefined;

    /*
    if(apiData.facility){

        //facility = facilityReduceApiData(apiData.facility as FacilityStrapi)

    }
     */

    if(undefined !== facility){
        photoSpore.facility = facility;
    }

    return photoSpore;
}
