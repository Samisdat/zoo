import {getUrl_3} from "./get-url";
import axios from "axios";

export interface Facility_3{
    id: number;
    slug: string;
    title: string;
    body: string;
    type: string;
    raw_published: string;
    published_at: string;
    created_at: string;
    updated_at: string;
}

export const getFacilities_3 = async ():Promise<Facility_3[]> => {

    const url = getUrl_3(`/facilities/?_limit=-1`);

    const response = await axios.get(
        url
    );

    return (response.data as Facility_3[]);

}
