import fetch from 'node-fetch';

import {getStrapiUrl} from "./utils/get-strapi-url";
import {AnimalInterface, castAnimal} from "./animals";

export type FacilityType = 'enclosure' | 'food' | 'playground' | 'toilet' | 'poi';

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

export const getFacilityBySlug = async (slug: string, published:boolean = false):Promise<FacilityInterface> =>{

    const requestUrl = getStrapiUrl(`/facilities?slug=${slug}`);

    const response = await fetch(requestUrl);
    const json = await response.json();

    const facilities = json.map(castFacility);

    return facilities[0];

}
export const getFacilities = async (published:boolean = false):Promise<FacilityInterface[]> =>{

    const requestUrl = getStrapiUrl('/facilities')

    const response = await fetch(requestUrl);
    const json = await response.json();

    const facilities = json.map(castFacility);

    return facilities;

}