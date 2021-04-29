import {Feature} from "geojson";
import {castFacility, FacilityInterface, getFacilityBySlug} from "./facilities";
import {MapElementType} from "../entity/map-element/map-element-spore";
import {MapElement} from "../entity/map-element/map-element";
import {getStrapiUrl} from "../../data-api/utils/get-strapi-url";
import {getJsonFromApi} from "../../data-api/utils/get-json-from-api";
import {MapElementStrapi} from "../entity/map-element/map-element-strapi";
import {PhotoInterface} from "./photos";
import {AnimalStrapi} from "../entity/animal/animal-strapi-interface";
import {Animal} from "../entity/animal/animal";


export interface MapElementInterface extends Feature{
    id: number;
    properties:{
        name: string;
        facility?: FacilityInterface | null;
        photo?: PhotoInterface | null;
        type: MapElementType;
        published_at: string;
        created_at: string;
        updated_at: string;
    }
};

const castMapElement = (rawMapElement:any):MapElementInterface=>{

    const id = rawMapElement.id;
    const title = rawMapElement.title;
    const geojson = rawMapElement.geojson as Feature;
    let facility = rawMapElement.facility;

    if(facility){
        facility = castFacility(facility);
    }
    const type = rawMapElement.type;
    const published_at = rawMapElement.published_at;
    const created_at = rawMapElement.created_at;
    const updated_at = rawMapElement.updated_at;

    const mapElement:MapElementInterface = {
        id,
        type: geojson.type,
        geometry: geojson.geometry,
        properties:{
            name: title,
            facility,
            type,
            published_at,
            created_at,
            updated_at,
        }
    };

    return mapElement

}

export const getMapElementById = async (mapElementId:number, published:boolean = false):Promise<MapElement> =>{

    const requestUrl = getStrapiUrl(`/map-elements?id=${mapElementId}`);

    const json = await getJsonFromApi<MapElementStrapi>(requestUrl);

    const mapElement = MapElement.fromApi(json);

    return mapElement;

}

export const getMapElements = async ():Promise<MapElement[]> =>{

    const requestUrl = getStrapiUrl(`/map-elements`);

    const json = await getJsonFromApi<MapElementStrapi[]>(requestUrl);

    const mapElements = json.map(MapElement.fromApi);

    return mapElements;


}

/*
export const getMapElements = async (published:boolean = false):Promise<MapElementInterface[]> =>{

    const requestUrl = getStrapiUrl('/map-elements')

    const response = await fetch(requestUrl);
    const json = await response.json();

    const mapElements:MapElementInterface[] = await json.map(castMapElement);

    for(const mapElement of mapElements){

        if(undefined === mapElement.properties?.facility){
            continue;
        }

        if(null  === mapElement.properties?.facility){
            continue;
        }

        let photo = undefined

        let photo = await getPhotoByFacility(mapElement.properties.facility.id);
        if( undefined === photo){

            const facility = await getFacilityBySlug(mapElement.properties.facility.slug);

            if(facility.animals && 0 !== facility.animals.length){
                photo = await getPhotoByAnimal(facility.animals[0].id);
            }
        }


        if( undefined !== photo){
            mapElement.properties.photo = photo || null;
        }

    }

    return mapElements;

}
*/