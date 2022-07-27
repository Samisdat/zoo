import React from 'react';
import {Image, ImageProps} from "./Image/Image";
import {Images, ImagesProps} from "./Images/Images";
import {Headline, HeadlineProps} from "./Headline/Headline";
import {Text, TextProps} from "./Text/Text";

export interface ContentPart {
    type: 'text' | 'headline' | 'image' | 'images';
}

interface ContentProps{
    parts: ContentPart[];
}

export const Contents = ({parts}:ContentProps) => {

    const mapContentParts = (part:ContentPart) => {

        if('image' === part.type){
            return (
                <Image {...part as ImageProps} />
            );
        }

        if('images' === part.type){
            return (
                <Images {...part as ImagesProps} />
            );
        }

        if('headline' === part.type){
            return (
                <Headline {...part as HeadlineProps}/>
            );
        }

        if('text' === part.type){
            return (
                <Text {...part as TextProps}/>
            );
        }

    };

    const contentComponents = parts.map(mapContentParts).filter((part)=>{
        return (undefined !== part);
    });

    return (
        <>
            {contentComponents}
        </>

    );
}