
import {FacilityStrapi} from "../facility/facility-strapi";
import {QrCodeStrapi} from "./qr-code-strapi-interface";
import {QrCodeSpore} from "./qr-code-spore";

export const qrCodeReduceApiData = (apiData: QrCodeStrapi):QrCodeSpore =>{

    const id = apiData.id;
    const title = apiData.title;
    const lat = apiData.lat;
    const lng = apiData.lng;
    const facility = apiData.facility.id;

    return{
        id,
        title,
        lat,
        lng,
        facility,
    };
}
