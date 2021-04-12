export interface Enclosures {
    title: string;
    slug: string;
    type: string;
    animals: string[] | null;
    images?: string[] | null;
    content: string;
    published: boolean;
}
