import {MapElementStrapi} from "./map-element-strapi";
import {MapElementSpore} from "./map-element-spore";

export const mapElementReduceApiData = (apiData: MapElementStrapi):MapElementSpore =>{

    const id = apiData.id;
    const title = apiData.title;
    const geojson = apiData.geojson;
    /*const facility = apiData.facility;*/
    const type = apiData.type;

    return{
        id,
        title,
        geojson,
        /*facility,*/
        type,
    };
}
