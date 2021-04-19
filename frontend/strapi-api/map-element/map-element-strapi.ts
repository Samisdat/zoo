import {Feature} from "geojson";
import {MapElementType} from "./map-element-spore";

export interface MapElementStrapi {
    id: number;
    title: string;
    geojson: Feature;
    /*facility: string;*/
    type: MapElementType;
    published_at: string;
    created_at: string;
    updated_at: string;
}
