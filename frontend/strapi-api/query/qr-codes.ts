import {getStrapi3Url, getStrapiUrl} from '../utils/get-strapi-url';
import {getJsonFromApi} from '../utils/get-json-from-api';
import {Post} from '../entity/post/post';
import {PostStrapi} from '../entity/post/post-strapi-interface';
import {Warehouse} from '../warehouse/warehouse';
import {getPhotoById} from './photos';
import {getIndividualAnimalById} from './individual-animals';
import {getAnimalById} from './animals';
import {QrCode} from '../entity/qr-code/qr-code';
import {QrCodeStrapi} from '../entity/qr-code/qr-code-strapi-interface';
import {getFacilityById} from './facilities';

const qs = require('qs');

export const loadRelations = async (qrCode:QrCode) => {

    if(null !== qrCode.facilityRaw){

        if (false === Warehouse.get().hasFacility(qrCode.facilityRaw)) {
            await getFacilityById(qrCode.facilityRaw);
        }

    }

    if(null !== qrCode.animalRaw){

        if (false === Warehouse.get().hasAnimal(qrCode.animalRaw)) {
            await getAnimalById(qrCode.animalRaw);
        }

    }

}

export const getQrCodeById = async (id: number):Promise<QrCode> =>{

    const query = qs.stringify({
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/qr-codes/${id}?${query}`);

    const json = await getJsonFromApi<QrCodeStrapi>(requestUrl);

    const qrCode = QrCode.fromApi(json);

    await loadRelations(qrCode);

    return qrCode;

}

export const getQrCodes = async ():Promise<QrCode[]> =>{

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
        populate: '*'
    }, {
        encodeValuesOnly: true, // prettify url
    });

    const requestUrl = getStrapiUrl(`/api/qr-codes?${query}`);

    const json = await getJsonFromApi<QrCodeStrapi[]>(requestUrl);

    const qrCodes = json.map(QrCode.fromApi);

    for(const qrCode of qrCodes){

        await loadRelations(qrCode);

    }

    return qrCodes;

}
