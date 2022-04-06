import {getStrapi3Url, getStrapiUrl} from '../utils/get-strapi-url';
import {Photo} from '../entity/photo/photo';
import {PhotoStrapi} from '../entity/photo/photo-strapi';
import {getJsonFromApi} from '../utils/get-json-from-api';

const qs = require('qs');

export type PhotoType = 'animal' | 'facility' ;

export const getPhotoById = async (id: number):Promise<Photo> =>{

    const query = qs.stringify({
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/photos/${id}?${query}`);

    const json = await getJsonFromApi<PhotoStrapi>(requestUrl);

    const photo = Photo.fromApi(json);

    return photo;

}


export const getPhotoByImageId = async (id: number):Promise<Photo> =>{

    const query = qs.stringify({
        pagination: {
            page: 1,
            pageSize: 10000,
            /* ;/ Deep filtering isn't available for polymorphic relations*/
        },
        fields:['id'],
        populate: ['image'],
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/photos?${query}`);

    const json = await getJsonFromApi<PhotoStrapi[]>(requestUrl);

    let photo = undefined;

    for(const photoStrapi of json){

        if(id === photoStrapi.attributes.image?.data?.id){

            photo = await getPhotoById(photoStrapi.id);

        }

    }

    return photo;

}

export const getPhotos = async ():Promise<Photo[]> =>{

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/photos?${query}`);

    const json = await getJsonFromApi<PhotoStrapi[]>(requestUrl);

    const photos = json.map(Photo.fromApi);

    return photos;

}

export const getPhotoByFacility = async (facilityId:number):Promise<Photo> =>{

    const requestUrl = getStrapi3Url(`/photos?facility=${facilityId}`);

    const json = await getJsonFromApi<PhotoStrapi>(requestUrl);

    const photo = Photo.fromApi(json);

    return photo;

}

export const getPhotoByAnimal = async (animalId:number):Promise<Photo> =>{

    const requestUrl = getStrapi3Url(`/photos?animal=${animalId}`)

    const json = await getJsonFromApi<PhotoStrapi>(requestUrl);

    const photo = Photo.fromApi(json);

    return photo;
}
