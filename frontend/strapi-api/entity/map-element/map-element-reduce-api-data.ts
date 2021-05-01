import {MapElementStrapi} from "./map-element-strapi";
import {MapElementSpore} from "./map-element-spore";

export const mapElementReduceApiData = (apiData: MapElementStrapi):MapElementSpore =>{

    const id = apiData.id;
    const title = apiData.title;
    const geojson = apiData.geojson;
    const type = apiData.type;

    const mapElementSpore: MapElementSpore = {
        id,
        title,
        geojson,
        type,
        facility: null
    };

    let facility = null;

    if(undefined !== apiData.facility?.id){

        facility = apiData.facility.id;

    }

    mapElementSpore.facility = facility;

    return mapElementSpore;
}
