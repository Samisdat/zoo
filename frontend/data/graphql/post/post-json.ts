export interface PostJson {
    id: number;
    slug: string;
    title: string;
    date: string;
    body: string;
    animals: number[];
    individual_animals: number[];
    facilities: number[];
    headerImage?: number;
}