import {Feature} from "geojson";
import {FacilitySpore} from "../facility/facility-spore";

export type MapElementType = 'point' | 'box' | 'border' | 'bounding_box';

export interface MapElementSpore{
    id: number;
    title: string;
    type: MapElementType;
    geojson: any;
    facility?: FacilitySpore | null;
    /*photo?: PhotoInterface | null;*/
}

