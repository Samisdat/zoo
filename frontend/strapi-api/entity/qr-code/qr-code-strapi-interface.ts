import {FacilityStrapi} from '../facility/facility-strapi';
import {AnimalStrapi} from '../animal/animal-strapi-interface';

export interface QrCodeStrapi {
    id: number;
    attributes:{
        title: string;
        lat: string;
        lng: string;
        facility?: {
            data: FacilityStrapi
        };
        animal?: {
            data: AnimalStrapi
        };
    }
}
