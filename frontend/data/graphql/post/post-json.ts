import {ContentPart} from "../../../components/Contents/Contents";

export interface PostJson {
    id: number;
    slug: string;
    title: string;
    date: string;
    body: string;
    content: ContentPart[];
    animals: number[];
    individual_animals: number[];
    facilities: number[];
    headerImage?: number | null;
}