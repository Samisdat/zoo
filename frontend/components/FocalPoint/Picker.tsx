import React, {useEffect, useRef, useState} from 'react';
import {Photo} from "../../strapi-api/entity/photo/photo";
import {getImagePath} from "../../helper/getImagePath";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {Position} from "../Map/Context/MapContext";

interface FocalPointPickerProps{
    photo:Photo,
    x?:number,
    y?:number,
    change:Function
}

const useStyles = makeStyles({
    wrap:{
        position: 'relative',
    },
    img:{
        position: 'absolute',
        top:'0px',
        left:'0px',
        width:'600px',
    },
    picker:{
        position: 'absolute',
        width:'20px',
        height:'20px',
        background: 'rgba(200,0,0,0.3)',
        border: '1px solid black',
        borderRadius: '100px',
        cursor: 'move',
        marginLeft: '-10px',
        marginTop: '-10px',
    }
});

export const FocalPointPicker = (props:FocalPointPickerProps) => {

    const ref = useRef();

    const classes = useStyles();

    const scale = 600 / props.photo.large.width;

    const height = scale * props.photo.large.height;

    let initialX = props.x | props.photo.large.width / 2;
    let initialY = props.y | props.photo.large.height / 2;

    initialX = initialX * scale;
    initialY = initialY * scale;

    const [dragging, setDragging] = useState<boolean>(false);

    const [point, setPoint] = useState<Position>({
        x: initialX,
        y: initialY
    });

    const handleMove = (evt:React.MouseEvent<HTMLImageElement>) => {

        if(!dragging){
            return;
        }

        const rect = (ref.current as HTMLElement).getBoundingClientRect();

        let x = evt.clientX - rect.left;

        if(0 > x ){
            x = 0
        }
        else if(600 < x ){
            x = 600
        }

        let y = evt.clientY - rect.top;

        if(0 > y ){
            y = 0
        }
        else if(height < y ){
            y = height
        }


        setPoint({
            x,
            y
        });

    };

    useEffect(()=>{
        //console.log(dragging)
    },[dragging]);

    useEffect(()=>{

        props.change({
            x: point.x / scale,
            y: point.y / scale
        });

    },[point]);

    return (
        <div
            ref={ref}
            className={classes.wrap}
            style={{
                height: `${height}px`
            }}
            onMouseMove={handleMove}
            onMouseUp={()=>{setDragging(false)}}
        >
            <img
                className={classes.img}
                src={getImagePath(props.photo.large.src)}
                draggable={false}
            />
            <img
                className={classes.picker}
                style={{
                    top: `${point.y}px`,
                    left: `${point.x}px`
                }}
                src={'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
                draggable={false}
                onMouseDown={()=>{setDragging(true)}}
                onMouseUp={()=>{setDragging(false)}}
            />

        </div>
    );
}