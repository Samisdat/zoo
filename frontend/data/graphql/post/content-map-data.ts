import {PhotoJson, PhotoSize} from "../photo/photo-json";
import {Position} from "../../../components/Map/Context/MapContext";
import {PhoteSizes} from "../photo/photo-map-data";
import {TextProps} from "../../../components/Contents/Text/Text";
import {HeadlineProps} from "../../../components/Contents/Headline/Headline";
import {ImageProps} from "../../../components/Contents/Image/Image";
import {ImagesProps} from "../../../components/Contents/Images/Images";

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
    const caption = apiData.attributes.caption;
    const alternativeText = apiData.attributes.alternativeText || null;

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

    if(caption){
        photoJson.caption = caption;
    }

    if(alternativeText){
        photoJson.alternativeText = alternativeText;
    }

    return photoJson;
}


export const contentMapData = (apiData: any[]):any[] =>{

    const content = apiData.map((part)=>{

        if('ComponentContentText' === part.__typename){

            const text:TextProps = {
                type: 'text',
                text: part.text,
            };

            return text;
        }

        if('ComponentContentHeadline' === part.__typename){

            const headline:HeadlineProps = {
                type: 'headline',
                headline: part.headline,
                level: part.level
            };

            return headline;
        }

        if('ComponentContentImage' === part.__typename){

            const images = part.images.data.map(extractImage);

            if(1 === images.length){

                const image = images[0];

                const imageProps:ImageProps = {
                    type: 'image',
                    align: part.align,
                    image
                };

                return imageProps;

            }

            const imagesProps:ImagesProps = {
                type: 'images',
                align: part.align,
                images
            };

            return imagesProps;

        }

        return undefined;

    }).filter((part)=>{return(undefined !== part)});

    return content;

}
