import {apolloClient} from "./apolloClient";

import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {Photo} from "./photo/photo";
import {Facility} from "./facility/facility";
import {getFacilities, getFacilityBySlug} from "./facility/grahpql";
import {facilityMapData} from "./facility/facility-map-data";
import {addToWarehouse} from "./add-to-warehouse";
import {animalMapData} from "./animal/animal-map-data";

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

    const datum = graphResult.data.facilities.data[0];

    const facility = facilityMapData(datum);

    addToWarehouse(facility);

    return Warehouse.get().getFacility(
        parseInt(datum.id,10)
    );

};

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
