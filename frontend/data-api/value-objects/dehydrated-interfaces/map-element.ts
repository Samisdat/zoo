import {Data} from "../data";
import {Feature} from "geojson";

export type MapElementType = 'point' | 'box' | 'border' | 'bounding_box';

export interface MapElementDehydrated extends Data{
    _type: 'dehydrated';
    id: number;
    title: string;
    type: MapElementType;
    geojson: any;
    /*facility: FacilityInterface | null;*/
    /*photo?: PhotoInterface | null;*/
}

