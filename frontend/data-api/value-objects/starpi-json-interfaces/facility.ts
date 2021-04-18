import {FacilityType} from "../dehydrated-interfaces/facility";

export interface FacilityStrapiJson{
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
