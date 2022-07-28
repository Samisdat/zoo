import React from 'react';
import {Image, ImageProps} from "./Image/Image";
import {Images, ImagesProps} from "./Images/Images";
import {Headline, HeadlineProps} from "./Headline/Headline";
import {Text, TextProps} from "./Text/Text";
import {ImageSlider, ImageSliderProps} from "./ImageSlider/ImageSlider";
import {Youtube, YoutubeProps} from "./Youtube/Youtube";

export interface ContentPart {
    type: 'text' | 'headline' | 'image' | 'images' | 'imageSlider' | 'video' | 'youtube';
}

interface ContentProps{
    parts: ContentPart[];
}

export const Contents = ({parts}:ContentProps) => {

    const mapContentParts = (part:ContentPart) => {

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

        if('imageSlider' === part.type){
            return (
                <ImageSlider {...part as ImageSliderProps} />
            );
        }

        if('youtube' === part.type){
            return (
                <Youtube {...part as YoutubeProps} />
            );
        }

        if('video' === part.type){
            return (
                <Youtube {...part as YoutubeProps} />
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