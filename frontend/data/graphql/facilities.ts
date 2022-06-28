import {apolloClient} from './apolloClient';

import {Facility} from './facility/facility';
import {getFacilities, getFacilityBySlug} from './facility/grahpql';
import {facilityMapData} from './facility/facility-map-data';
import {addToWarehouse} from './add-to-warehouse';
import {Warehouse} from '../warehouse/warehouse';

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

    const facilities = data.map((datum:any)=>{

        const facility = facilityMapData(datum);

        addToWarehouse(facility);

        return Warehouse.get().getFacility(
            parseInt(datum.id,10)
        );

    });

    return facilities;

}
