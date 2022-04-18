export interface PostJson {
    id: number | null;
    slug: string | null;
    title: string | null;
    date: string | null;
    body: string | null;
    animals: number[];
    individual_animals: number[];
    facilities: number[];
    headerImage: number | null;
}