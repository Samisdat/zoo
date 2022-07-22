export interface IndividualAnimalJson {
    id: number;
    name: string;
    slug: string;
    body: string;
    animal: number|null;
    photos: number[];
    headerImage: number | null;
}