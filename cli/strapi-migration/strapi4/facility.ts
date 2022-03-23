import axios from "axios";
import {getUrl_4} from "./get-url";
import {getHeaders} from "./get-header";
import {getStrapi4Url} from "../../strapi";

const qs = require('qs');

export interface Facility_4{
    id: number;
    attributes:{
        slug: string;
        title: string;
        body: string;
        type: string;
        created_at: string;
        updated_at: string;
    }
}

export const getFacilities_4 = async ():Promise<Facility_4[]> => {

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
    }, {
        encodeValuesOnly: true, // prettify url
    });


    const url = getUrl_4(`/api/facilities?${query}`);

    const response = await axios.get(
        url,
        getHeaders()
    );

    return (response.data.data as Facility_4[]);

};

export const getFacilityBySlug = (slug:string, facilities: Facility_4[]) => {

    return facilities.find((facility)=>{
        return (slug === facility.attributes.slug);
    })

}

export const updateFacility = async (facility:Facility_4): Promise<any | undefined> => {

    const url = getStrapi4Url(`/api/facilities/${facility.id}`);

    const foo:any = {
        ...facility.attributes,
    };

    const response = await axios.put(
        url,
        {
            data:foo,
            populate:'*'
        },
        getHeaders()
    );

    console.log(response.data)

    return (response.data)

}
