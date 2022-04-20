import {QrCodeStrapi} from './qr-code-strapi-interface';
import {QrCodeSpore} from './qr-code-spore';

export const qrCodeReduceApiData = (apiData: QrCodeStrapi):QrCodeSpore =>{

    const id = apiData.id;
    const title = apiData.attributes.title;
    const lat = apiData.attributes.lat;
    const lng = apiData.attributes.lng;
    let facility = apiData.attributes.facility?.data?.id;
    let animal = apiData.attributes.animal?.data?.id;

    if(!facility){
        facility = undefined;
    }

    if(!animal){
        animal = undefined;
    }

    const spore = {
        id,
        title,
        lat,
        lng,
        facility,
        animal,
    };

    return spore;
}
