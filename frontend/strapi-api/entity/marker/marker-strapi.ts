import {FacilityStrapi} from '../facility/facility-strapi';

export interface MarkerStrapi {
    id: number;
    attributes:{
        slug: string;
        x:number;
        y:number;
        priority:number;
        facility?: {
            data: FacilityStrapi
        };
    };
}
