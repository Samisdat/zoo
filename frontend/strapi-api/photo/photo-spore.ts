export interface PhotoSize{
    width: number;
    height: number;
    src: string;
}

export interface PhotoSpore{
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