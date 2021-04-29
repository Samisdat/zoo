export type MapElementType = 'point' | 'box' | 'border' | 'bounding_box';

export interface MapElementSpore{
    id: number;
    title: string;
    type: MapElementType;
    geojson: any;
    facility: number | null;
    photo?: number | null;
}

