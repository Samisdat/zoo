import {PhotoJson, PhotoSize} from "../photo/photo-json";
import {Position} from "../../../components/Map/Context/MapContext";
import {PhoteSizes} from "../photo/photo-map-data";

export interface Content {
    type: 'text' | 'headline' | 'images';
}

export interface ContentText extends Content{
    type: 'text',
    text: string;
}

export interface ContentHeadline extends Content{
    type: 'headline',
    headline: string;
    level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface ContentImages extends Content{
    type: 'images',
    align: 'left' | 'right' | 'fullsize';
    images: PhotoJson[];
}


const sizeNames = [
    'thumbnail',
    'large',
    'medium',
    'small',
];

export const extractImage = (apiData: any): PhotoJson =>{

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

    return photoJson;
}


export const contentMapData = (apiData: any[]):any[] =>{

    const content = apiData.map((part)=>{

        if('ComponentContentText' === part.__typename){

            const text:ContentText = {
                type: 'text',
                text: part.text,
            };

            return text;
        }

        if('ComponentContentHeadline' === part.__typename){

            const headline:ContentHeadline = {
                type: 'headline',
                headline: part.headline,
                level: part.level
            };

            return headline;
        }

        if('ComponentContentImage' === part.__typename){

            const images = part.images.data.map(extractImage);

            const headline:ContentImages = {
                type: 'images',
                align: part.align,
                images
            };

            return headline;
        }

        return undefined;

    }).filter((part)=>{return(undefined !== part)});

    return content;

}
