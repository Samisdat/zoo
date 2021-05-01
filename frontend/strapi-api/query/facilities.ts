import fetch from 'node-fetch';

import {AnimalInterface, castAnimal, getAnimalById} from "./animals";
import {getJsonFromApi} from "../../data-api/utils/get-json-from-api";
import {FacilityType} from "../entity/facility/facility-spore";
import {getStrapiUrl} from "../../data-api/utils/get-strapi-url";
import {Facility} from "../entity/facility/facility";
import {FacilityStrapi} from "../entity/facility/facility-strapi";
import {Animal} from "../entity/animal/animal";
import {Warehouse} from "../warehouse/warehouse";
import {getPhotoById} from "./photos";

export interface FacilityInterface{
    id: number;
    slug: string;
    title: string;
    body: string;
    type: FacilityType;
    animals?: AnimalInterface[];
    raw_published: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
}

export const castFacility = (rawFacility:any):FacilityInterface => {

    const id:number = rawFacility.id;
    const slug:string = rawFacility.slug;
    const title:string = rawFacility.title;
    const body:string = rawFacility.body;
    const type:FacilityType = rawFacility.type as FacilityType;

    const raw_published:boolean  = rawFacility.raw_published;
    const published_at:string = rawFacility.published_at;
    const created_at:string = rawFacility.created_at;
    const updated_at:string = rawFacility.updated_at;

    const facility:FacilityInterface = {
        id,
        slug,
        title,
        body,
        type,
        raw_published,
        published_at,
        created_at,
        updated_at,
    };

    if(rawFacility.animals){
        facility.animals = rawFacility.animals  .map(castAnimal);
    }

    return facility;
}

export const loadRelations = async (facility:Facility) => {

    for (const photoId of facility.photosRaw) {

        if (false === Warehouse.get().hasPhoto(photoId)) {
            await getPhotoById(photoId);
        }

    }

    for (const animalId of facility.animalsRaw) {

        if (false === Warehouse.get().hasAnimal(animalId)) {
            await getAnimalById(animalId);
        }

    }

}

export const getFacilityById = async (id: number):Promise<Facility> =>{

    const requestUrl = getStrapiUrl(`/facilities/${id}`);

    const json = await getJsonFromApi<FacilityStrapi>(requestUrl);

    const facility = Facility.fromApi(json);

    await loadRelations(facility);

    return facility;

}

export const getFacilityBySlug = async (slug: string):Promise<Facility> =>{

    const requestUrl = getStrapiUrl(`/facilities?slug=${slug}`);

    const json = await getJsonFromApi<FacilityStrapi[]>(requestUrl);

    const facility = Facility.fromApi(json[0]);

    await loadRelations(facility);

    return facility;

}

export const getFacilities = async ():Promise<Facility[]> =>{

    const requestUrl = getStrapiUrl('/facilities');

    const json = await getJsonFromApi<FacilityStrapi[]>(requestUrl);

    const facilities = json.map(Facility.fromApi);

    for(const facility of facilities){

        await loadRelations(facility);

    }

    return facilities;

}