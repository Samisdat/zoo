import {Data} from "../data";
import {MapElementType} from "../dehydrated-interfaces/map-element";
import {Feature} from "geojson";

export interface MapElementStrapiJson  extends Data{
    id: number;
    title: string;
    geojson: Feature;
    /*facility: string;*/
    type: MapElementType;
    published_at: string;
    created_at: string;
    updated_at: string;
}
