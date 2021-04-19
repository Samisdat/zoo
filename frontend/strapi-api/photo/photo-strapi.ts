export interface ImageFormatStrapi {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: string | null;
    url: string;
}

export interface ImageFormatsStrapi{
    [index:string]: ImageFormatStrapi;
    thumbnail?: ImageFormatStrapi;
    large?: ImageFormatStrapi;
    medium?: ImageFormatStrapi;
    small?: ImageFormatStrapi;
}

export interface ImageStrapi {
    id: number,
    name: string,
    alternativeText:string,
    caption: string,
    width: number,
    height: number,
    formats: ImageFormatsStrapi;
    hash: string;
    ext: string;
    mime: string,
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    created_at: string;
    updated_at: string;
}

export interface PhotoStrapi {
    id: number;
    title: string;
    copyright: string;
    animal: number;
    facility: number;
    image: ImageStrapi;
}
