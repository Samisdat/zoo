import {ImageFormatStrapiJson, PhotoStrapiJson} from "./starpi-json-interfaces/photo";
import {PhotoDehydrated} from "./dehydrated-interfaces/photo";
import {ValueObject} from "./value-object";
import {FacilityDehydrated} from "./dehydrated-interfaces/facility";
import {FacilityStrapiJson} from "./starpi-json-interfaces/facility";
import {reduceFacilityApiData} from "./facility";

export interface PhotoSize{
    width: number;
    height: number;
    src: string;
}

const sizeNames = [
    'thumbnail',
    'large',
    'medium',
    'small',
];

interface PhoteSizes{
    [index:string]: PhotoSize | null;
    thumbnail: PhotoSize | null;
    large: PhotoSize | null;
    medium: PhotoSize | null;
    small: PhotoSize | null;
}

export const reducePhotoApiData = (apiData: PhotoStrapiJson):PhotoDehydrated =>{

    const id = apiData.id;
    const title = apiData.title;
    const copyright = apiData.copyright;

    //const animal = apiData.animal?.id) as number || null;
    //const facility = apiData.facility?.id as number|| null;

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

    const formats = apiData.image?.formats;

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

    return{
        id,
        title,
        copyright,
        //animal,
        //facility,
        thumbnail:sizes.thumbnail,
        small:sizes.small,
        medium:sizes.medium,
        large:sizes.large,
    };
}

export class Photo extends ValueObject<PhotoDehydrated>{

    get id(): number {
        return this.json.id;
    }

    get title(): string{
        return this.json.title;
    }
    get copyright(): string{
        return this.json.copyright;
    }

    get thumbnail():PhotoSize | null{
        return this.json.thumbnail;
    }
    get large():PhotoSize | null{
        return this.json.large;
    }
    get medium():PhotoSize | null{
        return this.json.medium;
    }
    get small():PhotoSize | null{
        return this.json.small;
    }

    static hydrate(dehydrated:PhotoDehydrated):Photo{

        const photo = new Photo(dehydrated);

        return photo;

    }

    static fromApi(json:PhotoStrapiJson):Photo{

        const dehydrated:PhotoDehydrated = reducePhotoApiData(json);

        const photo = new Photo(dehydrated);

        return photo;

    }

}