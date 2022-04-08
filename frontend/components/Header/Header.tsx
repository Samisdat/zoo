import React from 'react';
import {Photo} from "../../strapi-api/entity/photo/photo";
import {Large} from "../viewport/Large";
import {FocalPointImage} from "../FocalPoint/Image";
import {Small} from "../viewport/Small";

export interface HeaderProps{
    photo:Photo;
    largeWidth:number;
    largeHeight:number;
    smallWidth:number;
    smallHeight:number;
}

export const Header = ({photo, largeWidth, largeHeight, smallWidth, smallHeight}:HeaderProps)    => {

    console.log('Header', photo)

    if(!photo || !photo.focalPoint){
        return null;
    }

    return (
        <React.Fragment>
            <Large>
                <FocalPointImage
                    photo={photo}
                    width={largeWidth}
                    height={largeHeight}
                    point={photo.focalPoint}
                    style={{
                        marginLeft:'-24px',
                    }}
                />
            </Large>
            <Small>
                <FocalPointImage
                    photo={photo}
                    width={smallWidth}
                    height={smallHeight}
                    point={photo.focalPoint}
                    style={{
                        marginLeft:'-16px',
                        marginBottom:'16px'
                    }}
                />
            </Small>
        </React.Fragment>
    );

}
