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

export const getPhotos = async ():Promise<Photo[]> =>{

    const requestUrl = getStrapi3Url('/photos')

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
