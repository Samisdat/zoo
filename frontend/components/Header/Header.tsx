import React from 'react';
import {Photo} from "../../strapi-api/entity/photo/photo";
import {Large} from "../viewport/Large";
import {FocalPointImage} from "../FocalPoint/Image";
import {Small} from "../viewport/Small";
import Container from "@mui/material/Container";

export interface HeaderProps{
    photo:Photo;
    largeWidth:number;
    largeHeight:number;
    smallWidth:number;
    smallHeight:number;
}

export const Header = ({photo, largeWidth, largeHeight, smallWidth, smallHeight}:HeaderProps)    => {

    if(!photo || !photo.focalPoint){
        return null;
    }

    return (
        <Container
            maxWidth='md'
            disableGutters={true}
        >
            <Large>
                <FocalPointImage
                    photo={photo}
                    width={largeWidth}
                    height={largeHeight}
                    point={photo.focalPoint}
                />
            </Large>
            <Small>
                <FocalPointImage
                    photo={photo}
                    width={smallWidth}
                    height={smallHeight}
                    point={photo.focalPoint}
                />
            </Small>
        </Container>
    );

}
