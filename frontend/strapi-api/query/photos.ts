import {getStrapiUrl} from "../../data-api/utils/get-strapi-url";
import {Photo} from "../entity/photo/photo";
import {PhotoStrapi} from "../entity/photo/photo-strapi";
import {getJsonFromApi} from "../../data-api/utils/get-json-from-api";
import {Animal} from "../entity/animal/animal";
import {AnimalStrapi} from "../entity/animal/animal-strapi-interface";
import {Facility} from "../entity/facility/facility";

export type PhotoType = 'animal' | 'facility' ;

export interface ImageFormat{
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string | null;
    url: string;

}

export interface ImageFormats{
    thumbnail?: ImageFormat | null;
    large?: ImageFormat | null;
    medium?: ImageFormat | null;
    small?: ImageFormat | null;
}


export interface ImageInterface{
    id: number,
    name: string,
    alternativeText:string,
    caption: string,
    width: number,
    height: number,
    formats: ImageFormats;
    hash: string;
    ext: string;
    mime: string,
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    created_at: string;
    updated_at: string;
}

export interface PhotoInterface{
    id: number;
    title: string;
    copyright: string;
    type: PhotoType;
    animal: number;
    facility: number;
    image: ImageInterface;
}

const castFormat = (rawFormat:any): ImageFormat | null =>{

    if(undefined === rawFormat){
        return null;
    }

    const name:string = rawFormat.name;
    const hash:string = rawFormat.hash;
    const ext:string = rawFormat.ext;
    const mime:string = rawFormat.mime;
    const width:number = rawFormat.width;
    const height:number = rawFormat.height;
    const size:number = rawFormat.size;
    const path:string  = rawFormat.path;
    const url:string = rawFormat.url;

    return {
        name,
        hash,
        ext,
        mime,
        width,
        height,
        size,
        path,
        url,
    };

}

const castFormats = (rawFormats:any):ImageFormats => {

    const thumbnail = castFormat(rawFormats.thumbnail);
    const large = castFormat(rawFormats.large);
    const medium = castFormat(rawFormats.medium);
    const small = castFormat(rawFormats.small);

    return{
        thumbnail,
        large,
        medium,
        small,
    };
}

const castImage = (rawImage:any):ImageInterface => {

    const id:number = rawImage.id;
    const name:string = rawImage.name;
    const alternativeText: string = rawImage.alternativeText;
    const caption: string = rawImage.caption;
    const width: number = rawImage.width as number;
    const height: number = rawImage.height as number;

    const formats: ImageFormats = castFormats(rawImage.formats);
    const hash: string = rawImage.hash;
    const ext: string = rawImage.ext;
    const mime: string = rawImage.mime;
    const size: number = rawImage.size as number;
    const url: string = rawImage.url;
    const previewUrl: string = rawImage.previewUrl;
    const provider: string = rawImage.provider;
    const provider_metadata: string = rawImage.provider_metadata;
    const created_at: string = rawImage.created_at;
    const updated_at: string = rawImage.updated_at;

    return{
        id,
        name,
        alternativeText,
        caption,
        width,
        height,
        formats,
        hash,
        ext,
        mime,
        size,
        url,
        previewUrl,
        provider,
        provider_metadata,
        created_at,
        updated_at,
    };

}

export const castPhoto = (rawPhoto:any):PhotoInterface => {

    const id: number = rawPhoto.id;
    const title: string = rawPhoto.title;
    const copyright: string = rawPhoto.copyright;
    //const type: string = rawPhoto.type;
    const type: PhotoType = 'facility';
    const animal: number = rawPhoto.animal?.id || null;
    const facility: number = rawPhoto.facility?.id || null;
    const image: ImageInterface = castImage(rawPhoto.image);

    const photo:PhotoInterface = {
        id,
        title,
        copyright,
        type,
        animal,
        facility,
        image,
    };

    return photo;
}

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