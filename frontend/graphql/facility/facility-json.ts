export type FacilityType = 'enclosure' | 'food' | 'playground' | 'toilet' | 'poi';

export interface FacilityJson {
    id: number;
    slug: string;
    title: string;
    body: string;
    type: FacilityType;
    animals: number[];
    photos: number[];
    markers: number[];
    nodes: number[];
    headerImage?: number;
}