import {PhotoJson, PhotoSize} from "./photo-json";
import {Position} from "../../components/Map/Context/MapContext";
import {Photo} from "./photo";

const sizeNames = [
    'thumbnail',
    'large',
    'medium',
    'small',
];

/**
 * DRY
 */
export interface PhoteSizes{
    [index:string]: PhotoSize | null;
    thumbnail: PhotoSize | null;
    large: PhotoSize | null;
    medium: PhotoSize | null;
    small: PhotoSize | null;
}

export const photoMapData = (apiData: any):Photo =>{

    const id = parseInt(apiData.id, 10);

    const title = apiData.attributes.name;
    const copyright = apiData.attributes.copyright || null;

    const thumbnail: PhotoSize | null = null;
    const small: PhotoSize | null = null;
    const medium: PhotoSize | null = null;
    const large: PhotoSize | null = null;

    const sizes:PhoteSizes = {
        thumbnail,
        small,
        medium,
        large
    };

    const formats = apiData.attributes.formats;

    if(formats){

        for(const sizeName of sizeNames){

            if(formats[sizeName]){

                sizes[sizeName] = {
                    width: formats[sizeName].width,
                    height: formats[sizeName].height,
                    src: formats[sizeName].url
                }
            }

        }

    }

    const focalPoint: Position = {
        x: apiData.attributes.x || 50,
        y: apiData.attributes.y || 50,
    };


    const photoJson: PhotoJson = {
        id,
        title,
        copyright,
        thumbnail: sizes.thumbnail,
        small: sizes.small,
        medium: sizes.medium,
        large: sizes.large,
        focalPoint
    };

    const photo = Photo.hydrate(photoJson);

    return photo;
}
