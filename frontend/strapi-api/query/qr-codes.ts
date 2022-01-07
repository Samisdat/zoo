import {getStrapiUrl} from "../utils/get-strapi-url";
import {getJsonFromApi} from "../utils/get-json-from-api";
import {Post} from "../entity/post/post";
import {PostStrapi} from "../entity/post/post-strapi-interface";
import {Warehouse} from "../warehouse/warehouse";
import {getPhotoById} from "./photos";
import {getIndividualAnimalById} from "./individual-animals";
import {getAnimalById} from "./animals";
import {QrCode} from "../entity/qr-code/qr-code";
import {QrCodeStrapi} from "../entity/qr-code/qr-code-strapi-interface";
import {getFacilityById} from "./facilities";

export const loadRelations = async (qrCode:QrCode) => {

    if(null !== qrCode.facilityRaw){

        if (false === Warehouse.get().hasFacility(qrCode.facilityRaw)) {
            await getFacilityById(qrCode.facilityRaw);
        }

    }

}

export const getQrCodeById = async (id: number):Promise<QrCode> =>{

    const requestUrl = getStrapiUrl(`/qr-codes/${id}`);

    const json = await getJsonFromApi<QrCodeStrapi>(requestUrl);
    console.log(json)
    const qrCode = QrCode.fromApi(json);

    await loadRelations(qrCode);

    return qrCode;

}

export const getQrCodes = async ():Promise<QrCode[]> =>{

    const requestUrl = getStrapiUrl('/qr-codes')

    const json = await getJsonFromApi<QrCodeStrapi[]>(requestUrl);



    const qrCodes = json.map(QrCode.fromApi);

    for(const qrCode of qrCodes){

        await loadRelations(qrCode);

    }

    return qrCodes;

}
