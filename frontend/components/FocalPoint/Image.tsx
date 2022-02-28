import React, {useEffect, useRef, useState} from 'react';
import {Photo} from "../../strapi-api/entity/photo/photo";
import {getImagePath} from "../../helper/getImagePath";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {Position} from "../Map/Context/MapContext";

interface FocalPointImageProps{
    photo:Photo;
    width:number;
    height:number;
    point?:Position;
}

const useStyles = makeStyles({
    img:{
        overflow: 'hidden',
        backgroundSize: 'cover'
    },
});

export const FocalPointImage = ({photo, width, height, point}:FocalPointImageProps) => {

    const classes = useStyles();

    if(!point){
        point = {
            x:undefined,
            y:undefined
        }
    }

    const image = photo.large || photo.medium || photo.small;

    return (
        <div
            className={classes.img}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundImage: `url(${getImagePath(image.src)})`,
                backgroundPosition: `${point.x}% ${point.y}%`
            }}
        />

    );
}