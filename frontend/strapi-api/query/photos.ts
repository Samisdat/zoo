import {getStrapiUrl} from "../utils/get-strapi-url";
import {Photo} from "../entity/photo/photo";
import {PhotoStrapi} from "../entity/photo/photo-strapi";
import {getJsonFromApi} from "../utils/get-json-from-api";

export type PhotoType = 'animal' | 'facility' ;

export const getPhotoById = async (id: number):Promise<Photo> =>{

    const requestUrl = getStrapiUrl(`/photos/${id}`);

    const json = await getJsonFromApi<PhotoStrapi>(requestUrl);

    const photo = Photo.fromApi(json);

    return photo;

}

export const getPhotos = async ():Promise<Photo[]> =>{

    const requestUrl = getStrapiUrl('/animals')

    const json = await getJsonFromApi<PhotoStrapi[]>(requestUrl);

    const photos = json.map(Photo.fromApi);

    return photos;

}

export const getPhotoByFacility = async (facilityId:number):Promise<Photo> =>{

    const requestUrl = getStrapiUrl(`/photos?facility=${facilityId}`);

    const json = await getJsonFromApi<PhotoStrapi>(requestUrl);

    const photo = Photo.fromApi(json);

    return photo;

}

export const getPhotoByAnimal = async (animalId:number):Promise<Photo> =>{

    const requestUrl = getStrapiUrl(`/photos?animal=${animalId}`)

    const json = await getJsonFromApi<PhotoStrapi>(requestUrl);

    const photo = Photo.fromApi(json);

    return photo;
}
