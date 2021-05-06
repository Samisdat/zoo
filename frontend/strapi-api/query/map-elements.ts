import {getFacilityById} from "./facilities";
import {MapElement} from "../entity/map-element/map-element";
import {getStrapiUrl} from "../../data-api/utils/get-strapi-url";
import {getJsonFromApi} from "../../data-api/utils/get-json-from-api";
import {MapElementStrapi} from "../entity/map-element/map-element-strapi";
import {Warehouse} from "../warehouse/warehouse";

export const loadRelations = async (mapElement:MapElement) => {

    if(null !== mapElement.facilityRaw){

        if (false === Warehouse.get().hasFacility(mapElement.facilityRaw)) {
            await getFacilityById(mapElement.facilityRaw);
        }

    }

}

export const getMapElementById = async (mapElementId:number, published:boolean = false):Promise<MapElement> =>{

    const requestUrl = getStrapiUrl(`/map-elements/${mapElementId}`);

    const json = await getJsonFromApi<MapElementStrapi>(requestUrl);

    const mapElement = MapElement.fromApi(json);

    await loadRelations(mapElement);

    return mapElement;

}

export const getMapElements = async ():Promise<MapElement[]> =>{

    const requestUrl = getStrapiUrl(`/map-elements`);

    const json = await getJsonFromApi<MapElementStrapi[]>(requestUrl);

    const mapElements = json.map(MapElement.fromApi);

    for(const mapElement of mapElements){

        await loadRelations(mapElement);

    }

    return mapElements;


}