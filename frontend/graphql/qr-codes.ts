

import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {getQrcodeBySlug} from "./qr-code/graphql";
import {qrCodeMapData} from "./qr-code/qr-code-map-data";
import {QrCode} from "./qr-code/qr-code";
import {addToWarehouse} from "./add-to-warehouse";
import {apolloClient} from "./apolloClient";

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

/*
export const fetchFacilities = async ():Promise<Facility[]> => {

    const graphResult = await apolloClient.query({
        query: getFacilities
    });

    const data = graphResult.data.facilities.data;

    let facilities = data.map((datum:any)=>{

        const facility = facilityMapData(datum);

        addToWarehouse(facility);

        return Warehouse.get().getFacility(
            parseInt(datum.id,10)
        );

    });

    return facilities;

}
*/