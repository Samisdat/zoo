import {getQrcodeBySlug, getQrCodes} from './qr-code/graphql';
import {qrCodeMapData} from './qr-code/qr-code-map-data';
import {QrCode} from './qr-code/qr-code';
import {addToWarehouse} from './add-to-warehouse';
import {apolloClient} from './apolloClient';
import {Warehouse} from '../warehouse/warehouse';

export const fetchQrCodeById = async (id: number):Promise<QrCode|undefined> => {

    const graphResult = await apolloClient.query({
        query: getQrcodeBySlug,
        variables:{id: id}
    });

    //console.log(JSON.stringify(graphResult, null, 4));
    const datum = graphResult.data.qrCode.data;

    const qrCode = qrCodeMapData(datum);

    addToWarehouse(qrCode);

    return Warehouse.get().getQrCode(
        parseInt(datum.id,10)
    );

};


export const fetchQrCodes = async ():Promise<QrCode[]> => {

    const graphResult = await apolloClient.query({
        query: getQrCodes
    });

    const data = graphResult.data.qrCodes.data;

    const qrCodes = data.map((datum:any)=>{

        const qrCode = qrCodeMapData(datum);

        addToWarehouse(qrCode);

        return Warehouse.get().getQrCode(
            parseInt(datum.id,10)
        );

    });

    return qrCodes;

}
