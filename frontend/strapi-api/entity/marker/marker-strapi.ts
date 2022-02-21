import {FacilityStrapi} from "../facility/facility-strapi";

export interface MarkerStrapi {
    id: number;
    slug: string;
    x:number;
    y:number;
    priority:number;
    facility: FacilityStrapi;
}
