import {FacilityStrapi} from "../facility/facility-strapi";
import {AnimalStrapi} from "../animal/animal-strapi-interface";

export interface QrCodeStrapi {
    id: number;
    title: string;
    lat: string;
    lng: string;
    facility?: FacilityStrapi;
    animal?: AnimalStrapi;
}
