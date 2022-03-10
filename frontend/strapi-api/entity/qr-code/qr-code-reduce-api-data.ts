import {QrCodeStrapi} from './qr-code-strapi-interface';
import {QrCodeSpore} from './qr-code-spore';

export const qrCodeReduceApiData = (apiData: QrCodeStrapi):QrCodeSpore =>{

    const id = apiData.id;
    const title = apiData.title;
    const lat = apiData.lat;
    const lng = apiData.lng;
    let facility = apiData.facility?.id;
    let animal = apiData.animal?.id;

    if(!facility){
        facility = null;
    }

    if(!animal){
        animal = null;
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
