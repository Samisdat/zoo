import React from 'react';
import {getImagePath} from '../../helper/getImagePath';
import {Position} from '../Map/Context/MapContext';
import {styled} from '@mui/material/styles';
import {Photo} from "../../data/graphql/photo/photo";

interface FocalPointImageProps{
    photo:Photo;
    width:number;
    height:number;
    point?:Position;
    style?:React.CSSProperties;
}

const Img = styled('div')({
    overflow: 'hidden',
    backgroundSize: 'cover'
});

export const FocalPointImage = ({photo, width, height, point, style}:FocalPointImageProps) => {

    if(!point){
        point = {
            x:undefined,
            y:undefined
        }
    }

    const image = photo.large || photo.medium || photo.small;

    return (
        <Img
            style={{
                ...style,
                width: `${width}px`,
                height: `${height}px`,
                backgroundImage: `url(${getImagePath(image.src)})`,
                backgroundPosition: `${point.x}% ${point.y}%`
            }}
        />

    );
}