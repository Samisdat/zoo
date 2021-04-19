import {FacilityType} from "./facility-spore";

export interface FacilityStrapi{
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
