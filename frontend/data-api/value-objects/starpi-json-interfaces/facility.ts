import {FacilityType} from "../dehydrated-interfaces/facility";
import {Data} from "../data";

export interface FacilityStrapiJson  extends Data{
    id: number;
    slug: string;
    title: string;
    body: string;
    type: FacilityType;
    /*animals?: AnimalInterface[];*/
    raw_published: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
}
