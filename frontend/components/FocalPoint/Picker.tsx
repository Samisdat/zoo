import React, {useEffect, useRef, useState} from 'react';
import {Photo} from "../../strapi-api/entity/photo/photo";
import {getImagePath} from "../../helper/getImagePath";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";

interface FocalPointPickerProps{
    photo:Photo,
    x?:number,
    y?:number
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
        cursor: 'move'
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

    const [x, setX] = useState<number>(initialX);
    const [y, setY] = useState<number>(initialY);

    const handleMove = (evt:React.MouseEvent<HTMLImageElement>) => {

        //console.log(dragging, offsetX, offsetY)

        if(!dragging){
            return;
        }

        const rect = (ref.current as HTMLElement).getBoundingClientRect();

        setX(evt.clientX - rect.left);
        setY(evt.clientY - rect.top);
    };

    useEffect(()=>{
        console.log(dragging)
    },[dragging]);

    return (
        <React.Fragment>
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
                    top: `${y}px`,
                    left: `${x}px`
                }}
                src={'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
                draggable={false}
                onMouseDown={()=>{setDragging(true)}}
                onMouseUp={()=>{setDragging(false)}}
            />

        </div>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
            <p>Lorem Ipsum</p>
        </React.Fragment>
    );
}