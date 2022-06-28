import React, {useEffect, useRef, useState} from 'react';
import {getImagePath} from '../../helper/getImagePath';
import {Position} from '../Map/Context/MapContext';
import {styled} from '@mui/material/styles';
import {Photo} from "../../data/graphql/photo/photo";

interface FocalPointPickerProps{
    photo:Photo;
    point:Position;
    change:(pos:Position) => void;
}

const Wrap = styled('div')({
    position: 'relative',
});

const Img = styled('img')({
    position: 'absolute',
    top:'0px',
    left:'0px',
    width:'600px',
});

const Picker = styled('img')({
    position: 'absolute',
    width:'20px',
    height:'20px',
    background: 'rgba(200,0,0,0.3)',
    border: '1px solid black',
    borderRadius: '100px',
    cursor: 'move',
    marginLeft: '-10px',
    marginTop: '-10px',
});

export const FocalPointPicker = (props:FocalPointPickerProps) => {

    const ref = useRef();

    const image = props.photo.large || props.photo.medium || props.photo.small;

    const scale = 600 / image.width;

    const height = scale * image.height;

    let initialX = props.point.x;
    let initialY = props.point.y;

    initialX = initialX * 600 / 100;
    initialY = initialY * height / 100;

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

        props.change({
            x: point.x / 600 * 100,
            y: point.y / height * 100
        });

    },[point]);

    return (
        <Wrap
            ref={ref}
            style={{
                height: `${height}px`
            }}
            onMouseMove={handleMove}
            onMouseUp={()=>{setDragging(false)}}
        >
            <Img
                src={getImagePath(image.src)}
                draggable={false}
            />
            <Picker
                style={{
                    top: `${point.y}px`,
                    left: `${point.x}px`
                }}
                src={'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='}
                draggable={false}
                onMouseDown={()=>{setDragging(true)}}
                onMouseUp={()=>{setDragging(false)}}
            />

        </Wrap>
    );
}