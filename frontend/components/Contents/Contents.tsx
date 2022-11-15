import React from 'react';
import {ClearStyled, Image, ImageProps} from "./Image/Image";
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

    const mapContentParts = (part:ContentPart, index:number) => {

        if('headline' === part.type){
            return (
                <Headline
                    key={index}
                    {...part as HeadlineProps}
                />
            );
        }

        if('text' === part.type){
            return (
                <Text
                    key={index}
                    {...part as TextProps}
                />
            );
        }

        if('image' === part.type){
            return (
                <Image
                    key={index}
                    {...part as ImageProps}
                />
            );
        }

        if('images' === part.type){
            return (
                <Images
                    key={index}
                    {...part as ImagesProps}
                />
            );
        }

        if('imageSlider' === part.type){
            return (
                <ImageSlider
                    key={index}
                    {...part as ImageSliderProps}
                />
            );
        }

        if('youtube' === part.type){
            return (
                <Youtube
                    key={index}
                    {...part as YoutubeProps}
                />
            );
        }

        if('video' === part.type){
            return (
                <Youtube
                    key={index}
                    {...part as YoutubeProps}
                />
            );
        }

    };

    const contentComponents = parts.map(mapContentParts).filter((part)=>{
        return (undefined !== part);
    });

    return (
        <>
            {contentComponents}
            <ClearStyled />
        </>

    );
}