import {FacilityType} from "./facility-spore";
import {PhotoStrapi} from "../photo/photo-strapi";
import {AnimalStrapi} from "../animal/animal-strapi-interface";
import {MapElementStrapi} from "../map-element/map-element-strapi";
import {NodeStrapi} from "../node/node-strapi-interface";

export interface FacilityStrapi{
    id: number;
    slug: string;
    title: string;
    body: string;
    type: FacilityType;
    animals: AnimalStrapi[];
    photos: PhotoStrapi[];
    map_elements: MapElementStrapi[];
    graph_nodes: NodeStrapi[];
    raw_published: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
}
