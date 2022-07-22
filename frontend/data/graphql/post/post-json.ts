import {Content} from "./content-map-data";

export interface PostJson {
    id: number;
    slug: string;
    title: string;
    date: string;
    body: string;
    content: Content[];
    animals: number[];
    individual_animals: number[];
    facilities: number[];
    headerImage?: number | null;
}