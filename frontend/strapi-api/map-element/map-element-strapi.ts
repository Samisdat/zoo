import {Feature} from "geojson";
import {MapElementType} from "./map-element-spore";
import {FacilityStrapi} from "../facility/facility-strapi";

export interface MapElementStrapi {
    id: number;
    title: string;
    geojson: Feature;
    facility: FacilityStrapi;
    type: MapElementType;
    published_at: string;
    created_at: string;
    updated_at: string;
}
