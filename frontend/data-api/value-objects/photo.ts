import {ImageFormatStrapiJson, PhotoStrapiJson} from "./starpi-json-interfaces/photo";
import {PhotoDehydrated} from "./dehydrated-interfaces/photo";

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
    const sizes = {
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
        _type:'dehydrated',
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

export class Photo{

    private json: PhotoDehydrated ;

    constructor(json: PhotoStrapiJson | PhotoDehydrated) {

        if('dehydrated' !== json._type){

            json = reducePhotoApiData(json);

        }

        this.json = json as PhotoDehydrated;
    }

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
    get large():PhotoSize{
        return this.json.large;
    }
    get medium():PhotoSize{
        return this.json.medium;
    }
    get small():PhotoSize{
        return this.json.small;
    }

    public dehydrate():PhotoDehydrated {
        return this.json;
    }

}

export const createPhoto = (photoJson:PhotoStrapiJson | PhotoDehydrated) => {
    return new Photo(photoJson);
}