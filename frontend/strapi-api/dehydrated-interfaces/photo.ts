import {PhotoSize} from "../photo";

export interface PhotoDehydrated{
    id: number;
    title: string;
    copyright: string;
    //facility: number| null,
    //animal: number| null,
    thumbnail: PhotoSize | null;
    small: PhotoSize | null;
    medium: PhotoSize | null;
    large: PhotoSize | null;
}