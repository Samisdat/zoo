import {Data} from "../data";

export interface ImageFormatStrapiJson{
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

export interface ImageFormatsStrapiJson{
    [index:string]: ImageFormatStrapiJson;
    thumbnail?: ImageFormatStrapiJson;
    large?: ImageFormatStrapiJson;
    medium?: ImageFormatStrapiJson;
    small?: ImageFormatStrapiJson;
}


export interface ImageStrapiJson{
    id: number,
    name: string,
    alternativeText:string,
    caption: string,
    width: number,
    height: number,
    formats: ImageFormatsStrapiJson;
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

export interface PhotoStrapiJson extends Data{
    id: number;
    title: string;
    copyright: string;
    animal: number;
    facility: number;
    image: ImageStrapiJson;
}
