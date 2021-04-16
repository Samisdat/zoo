import {Data} from "../data";

export type FacilityType = 'enclosure' | 'food' | 'playground' | 'toilet' | 'poi';

export interface FacilityDehydrated extends Data{
    _type: 'dehydrated';
    id: number;
    slug: string;
    title: string;
    body: string;
    type: FacilityType;
}