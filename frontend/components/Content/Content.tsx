import React from 'react';
import {Content as foo, ContentHeadline, ContentImages, ContentText} from "../../data/graphql/post/content-map-data";
import {Image} from "./Image/Image";
import {Headline} from "./Headline/Headline";
import {Text} from "./Text/Text";

interface ContentProps{
    content:foo[];
}

export const Content = ({content}:ContentProps) => {

    const mapContentComponents = (part:foo) => {

        if('images' === part.type){
            return (
                <Image
                    image={part as ContentImages}
                />
            );
        }

        if('headline' === part.type){
            return (
                <Headline
                    headline={part as ContentHeadline}
                />
            );
        }

        if('text' === part.type){
            return (
                <Text
                    text={part as ContentText}
                />
            );
        }

    };

    const contentComponents = content.map(mapContentComponents).filter((part)=>{
        return (undefined !== part);
    });

    return (
        <>
            {contentComponents}
        </>

    );
}