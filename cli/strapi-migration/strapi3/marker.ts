import {getUrl_3} from "./get-url";
import axios from "axios";
import {Facility_3} from "./facility";

export interface Marker_3{
    id: number,
    slug: string;
    x: number;
    y: number;
    facility: Facility_3;
    priority: number;
    created_at: string;
    updated_at: string;
}

export const getMarkers_3 = async ():Promise<Marker_3[]> => {

    const url = getUrl_3(`/markers/?_limit=-1`);

    const response = await axios.get(
        url
    );

    return (response.data as Marker_3[]);

}
