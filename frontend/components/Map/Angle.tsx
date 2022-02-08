import * as d3 from 'd3';

import React, {useEffect, useRef, useState} from 'react';
import {angle, svg} from "../../constants";
import {MapTransformInterface, useMap} from "./Context/MapContext";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    angle:{
        position: 'absolute',
        top: '50px',
        left: '10px',
        right: '10px',

    }
});

export const Angle = (props) => {

    const classes = useStyles();

    const {
        state: {path, focus, transform, angle, ref, dimension, center, projection, position},
        dispatch
    } = useMap();

    const [startPos, setStartPos] = useState<any>(undefined);
    const [pos, setPos] = useState<any>(undefined);

    const inputRef = useRef(null);
    const [angleState, setAngleState] = useState<number>(angle);

    useEffect(()=>{

        dispatch({
            type: 'SET_ANGLE',
            angle: angleState
        });

    },[angleState]);

    const onChange = (event)=>{
        setAngleState(
            parseInt(event.target.value, 10)
        );
    }


    useEffect(() => {

        /*
        const center = {
            y: (viewport / 2),
            x: (viewport / 2)
        };

        const rotate = `rotate(${angle} ${center.x} ${center.y})`;

        d3.select(compassRef.current).select('#Layer1')
            //.transition(200)
            .attr('transform', rotate);

        */
    },[transform]);

    return (
        <div
            className={classes.angle}
        >
            <label htmlFor="angle">Winkel</label>
            <input
                type="number"
                id="angle"
                name="angle"
                min="1"
                max="360"
                value={angleState}
                onChange={onChange}
            />
            <div>
                {angleState}
            </div>

        </div>
    );
}
