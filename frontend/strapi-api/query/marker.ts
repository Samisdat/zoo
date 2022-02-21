import {getFacilityById} from "./facilities";
import {getStrapiUrl} from "../utils/get-strapi-url";
import {getJsonFromApi} from "../utils/get-json-from-api";
import {Warehouse} from "../warehouse/warehouse";
import {Marker} from "../entity/marker/marker";
import {MarkerStrapi} from "../entity/marker/marker-strapi";

export const loadRelations = async (marker:Marker) => {

    if(null !== marker.facilityRaw){

        if (false === Warehouse.get().hasFacility(marker.facilityRaw)) {
            await getFacilityById(marker.facilityRaw);
        }

    }

}

export const getMarkerById = async (markerId:number):Promise<Marker> =>{

    const requestUrl = getStrapiUrl(`/markers/${markerId}`);

    const json = await getJsonFromApi<MarkerStrapi>(requestUrl);

    const marker = Marker.fromApi(json);

    await loadRelations(marker);

    return marker;

}

export const getMarkers = async ():Promise<Marker[]> =>{

    const requestUrl = getStrapiUrl(`/markers`);

    const json = await getJsonFromApi<MarkerStrapi[]>(requestUrl);

    const markers = json.map(Marker.fromApi);

    for(const marker of markers){

        await loadRelations(marker);

    }

    return markers;


}