import {FacilityType} from './facility-spore';
import {ImageStrapi, PhotoStrapi} from '../photo/photo-strapi';
import {AnimalStrapi} from '../animal/animal-strapi-interface';
import {NodeStrapi} from '../node/node-strapi-interface';
import {MarkerStrapi} from '../marker/marker-strapi';

export interface FacilityStrapi{
    id: number;
    attributes:{
        slug: string;
        title: string;
        body: string;
        type: FacilityType;
        animals?: {
            data:AnimalStrapi[]
        };
        photos?: {
            data:PhotoStrapi[]
        };
        markers?: {
            data:MarkerStrapi[]
        };
        graph_nodes?: {
            data:NodeStrapi[]
        };
        headerImg?: {
            image?: {
                data: ImageStrapi;
            };
        }
        raw_published: boolean;
        published_at: string;
        created_at: string;
        updated_at: string;
    }
}
