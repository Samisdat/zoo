import {apolloClient} from "./apolloClient";

import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {Photo} from "./photo/photo";
import {Facility} from "./facility/facility";
import {getFacilities, getFacilityBySlug} from "./facility/queries";

const addFacilityToWarehouse = (facility:Facility, graphFacility:any) => {

    if(facility.id){

        Warehouse.get().addFacility(facility);

        if(facility.headerImageRaw){
            const photo = Photo.fromApi(graphFacility.attributes?.headerImg?.image?.data);

            if(false === Warehouse.get().hasPhoto(photo.id)){
                Warehouse.get().addPhoto(photo);
            }

        }

    }

}

export const fetchFacilityBySlug = async (slug: string):Promise<Facility|undefined> => {

    const graphResult = await apolloClient.query({
        query: getFacilityBySlug,
        variables:{slug}
    });

    const graphFacility = graphResult.data.facilities.data[0];
    const facility = Facility.fromApi(graphFacility);

    addFacilityToWarehouse(facility, graphFacility);

    return facility;

};

export const fetchFacilities = async ():Promise<Facility[]> => {

    const graphResult = await apolloClient.query({
        query: getFacilities
    });

    const graphFacilities = graphResult.data.facilities.data;

    let facilities = graphFacilities.map((graphFacility:any)=>{

        const facility = Facility.fromApi(graphFacility);

        addFacilityToWarehouse(facility, graphFacility);

        return facility;

    });

    return facilities;

}
