import {Position} from '../../../components/Map/Context/MapContext';

export interface PhotoSize{
    width: number;
    height: number;
    src: string;
}

export interface PhotoSpore{
    id: number;
    title: string;
    copyright: string;
    facility?: number | null,
    animal?: number | number,
    thumbnail: PhotoSize | null;
    small: PhotoSize | null;
    medium: PhotoSize | null;
    large: PhotoSize | null;
    focalPoint: Position | null;
}