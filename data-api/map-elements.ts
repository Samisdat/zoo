import fetch from 'node-fetch';

import {getStrapiUrl} from "./utils/get-strapi-url";
import {Feature} from "geojson";

export type FacilityType = 'enclosure' | 'food' | 'playground' | 'toilet' | 'poi';

export interface FacilityInterface{
    id: string;
    slug: string;
    title: string;
    body: string;
    type: FacilityType;
    raw_published: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
}

export type MapElementType = 'point' | 'box';

export interface MapElementInterface {
    id: string;
    title: string;
    geojson: Feature;
    facility: FacilityInterface;
    type: MapElementType;
    published_at: string;
    created_at: string;
    updated_at: string;
};

const castFacility = (rawFacility:any):FacilityInterface => {

    const id:string = rawFacility.id;
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

    return facility;
}

const castMapElement = (rawMapElement:any):MapElementInterface=>{

    const id = rawMapElement.id;
    const title = rawMapElement.title;
    const geojson = rawMapElement.geojson;
    const facility = castFacility(rawMapElement.facility);
    const type = rawMapElement.type;
    const published_at = rawMapElement.published_at;
    const created_at = rawMapElement.created_at;
    const updated_at = rawMapElement.updated_at;

    const mapElement:MapElementInterface = {
        id,
        title,
        geojson,
        facility,
        type,
        published_at,
        created_at,
        updated_at,
    };

    return mapElement

}

export const getMapElements = async (published:boolean = false):Promise<MapElementInterface[]> =>{

    const requestUrl = getStrapiUrl('/map-elements')

    const response = await fetch(requestUrl);
    const json = await response.json();

    const mapElements = json.map(castMapElement);

    return mapElements;

}