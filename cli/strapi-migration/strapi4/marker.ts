import axios from "axios";
import {getUrl_4} from "./get-url";
import {getHeaders} from "./get-header";
import {getStrapi4Url} from "../../strapi";
import {Facility_4} from "./facility";

const qs = require('qs');

export interface MarkerAttributes{
    slug: string;
    x: number;
    y: number;
    priority: number;
    facility: Facility_4 | number;
    created_at?: string;
    updated_at?: string;
}

export interface Marker_4{
    id: number;
    attributes:MarkerAttributes;
}

export const getMarkers_4 = async ():Promise<Marker_4[]> => {

    const query = qs.stringify({
        pagination: {
            pageSize: 1000,
        },
    }, {
        encodeValuesOnly: true, // prettify url
    });


    const url = getUrl_4(`/api/markers?${query}`);

    const response = await axios.get(
        url,
        getHeaders()
    );

    return (response.data.data as Marker_4[]);

};

export const createMarker = async (marker:MarkerAttributes): Promise<any | undefined> => {

    const url = getStrapi4Url(`/api/markers`);

    const foo:any = {
        ...marker,
    };

    const response = await axios.post(
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
