export type FacilityType = 'enclosure' | 'food' | 'playground' | 'toilet' | 'poi';

export interface FacilityDehydrated{
    id: number;
    slug: string;
    title: string;
    body: string;
    type: FacilityType;
}