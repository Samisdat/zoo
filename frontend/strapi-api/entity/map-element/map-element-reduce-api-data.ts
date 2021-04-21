import {MapElementStrapi} from "./map-element-strapi";
import {MapElementSpore} from "./map-element-spore";
import {facilityReduceApiData} from "../facility/facility-reduce-api-data";
import {FacilityStrapi} from "../facility/facility-strapi";

export const mapElementReduceApiData = (apiData: MapElementStrapi):MapElementSpore =>{

    const id = apiData.id;
    const title = apiData.title;
    const geojson = apiData.geojson;
    /*const facility = apiData.facility;*/
    const type = apiData.type;

    const mapElementSpore: MapElementSpore = {
        id,
        title,
        geojson,
        type,
    };

    let facility = undefined;

    if(apiData.facility){

        facility = facilityReduceApiData(apiData.facility as FacilityStrapi)

    }

    if(undefined !== facility){
        mapElementSpore.facility = facility;
    }

    return mapElementSpore;
}
