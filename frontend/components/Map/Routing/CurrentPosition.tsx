import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {useMap} from "../Context/MapContext";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    fuzziness:{
        fill: '00a800',
        opacity: 0.2
    },
    inner:{
        fill: '#00a800',
        stroke: '#0A6001',
        strokeWidth: '3px',
    }
});

export const CurrentPosition = () => {

    const classes = useStyles();

    const {
        state: {position},
    } = useMap();

    const refFuzziness = useRef(null);
    const refPos = useRef(null);

    useEffect(() => {

        if(!position || undefined === position.x || undefined === position.y){
            return;
        }


        d3.select(refPos.current)
            .attr('cx', function(d) {
                return position.x;
            })
            .attr('cy', function(d) {
                return position.y;
            })
        ;

        d3.select(refFuzziness.current)
            .attr('cx', function(d) {
                return position.x;
            })
            .attr('cy', function(d) {
                return position.y;
            })
        ;


    },[position]);

    return (
        <React.Fragment>
            <circle
                ref={refFuzziness}
                className={classes.fuzziness}
                r={30}
            />
            <circle
                ref={refPos}
                className={classes.inner}
                r={10}
            />
        </React.Fragment>
    );
}
