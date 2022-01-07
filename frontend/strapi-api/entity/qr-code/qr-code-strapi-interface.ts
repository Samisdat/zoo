import {FacilityStrapi} from "../facility/facility-strapi";

export interface QrCodeStrapi {
    id: number;
    title: string;
    lat: string;
    lng: string;
    facility: FacilityStrapi;
}
