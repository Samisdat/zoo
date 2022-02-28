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

    if(!point.x){
        point.x = photo.large.width / 2;
    }

    if(!point.y){
        point.y = photo.large.height / 2;
    }

    const left = point.x / photo.large.width * 100;
    const top = point.y / photo.large.height * 100;

    return (
        <div
            className={classes.img}
            style={{
                width: `${width}px`,
                height: `${height}px`,
                backgroundImage: `url(${getImagePath(photo.large.src)})`,
                backgroundPosition: `${left}% ${top}%`
            }}
        />

    );
}