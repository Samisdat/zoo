export type FacilityType = 'enclosure' | 'food' | 'playground' | 'toilet' | 'poi';

export interface FacilitySpore{
    id: number;
    slug: string;
    title: string;
    body: string;
    type: FacilityType;
    animals: number[];
    photos: number[];
}