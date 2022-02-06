import * as d3 from 'd3';

import React, {useEffect, useRef} from 'react';
import {angle, svg} from "../../constants";
import {useMap} from "./Context/MapContext";

export const Compass = (props) => {

    const compassRef = useRef(null);

    const {
        state: {path, focus, transform, ref, dimension, center, projection, position},
        dispatch
    } = useMap();


    useEffect(() => {

        const center = {
            y: (393 / 2),
            x: (393 / 2)
        };


        const rotate = `rotate(${45} ${center.x} ${center.y})`;

        console.log(rotate);

        d3.select(compassRef.current).select('#Layer1')
            .attr('transform', rotate)


    },[transform]);


    return (
        <svg
            ref={compassRef}
            width="56"
            height="56"
            viewBox="0 0 393 393"
            style={{
                fillRule:'evenodd',
                clipRule:'evenodd',
                strokeLinecap:'round',
                strokeLinejoin:'round',
                strokeMiterlimit:1.5,
            }}
        >
            <g id="Layer1">
                <circle cx="196.436" cy="196.399" r="196.41" style={{fill:'#3b393b'}}/>
                <g>
                    <path d="M81.992,196.399l-73.056,0" style={{fill:'none',stroke:'#cecdce',strokeWidth:'8.33px'}}/>
                    <path d="M311.159,196.399l72.777,0" style={{fill:'none',stroke:'#cecdce',strokeWidth:'8.33px'}}/>
                    <path d="M196.436,8.899l0,73.056" style={{fill:'none',stroke:'#cecdce',strokeWidth:'8.33px'}}/>
                    <path d="M196.436,311.122l0,72.777" style={{fill:'none',stroke:'#cecdce',strokeWidth:'8.33px'}}/>
                </g>
                <g>
                    <path d="M36.42,262.68l40.467,-16.762l-40.467,16.762Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                    <path d="M316.028,146.863l40.136,-16.625l-40.136,16.625Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                    <path d="M146.899,76.807l-16.525,-39.896l16.525,39.896Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                    <path d="M246.134,316.381l16.524,39.892l-16.524,-39.892Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                    <path d="M287.973,104.862l30.517,-30.516l-30.517,30.516Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                    <path d="M104.918,287.917l-30.895,30.896l30.895,-30.896Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                    <path d="M74.382,74.346l30.636,30.635l-30.636,-30.635Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                    <path d="M288.138,288.102l30.545,30.544l-30.545,-30.544Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                    <path d="M262.617,36.623l-16.598,40.072l16.598,-40.072Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                    <path d="M130.247,356.194l16.539,-39.93l-16.539,39.93Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                    <path d="M77.077,146.959l-40.412,-16.739l40.412,16.739Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                    <path d="M356.214,262.581l-40.059,-16.593l40.059,16.593Z" style={{fill:'none',stroke:'#5c5a5c',strokeWidth:'8.33px'}}/>
                </g>
                <text
                    x="151.249px"
                    y="241.024px" style={{
                        fontFamily:'HelveticaNeue, Helvetica Neue',
                        fontSize:'125px',
                        fill:'#cecdce'
                    }}
                            >
                            N
                            </text>
                <path d="M196.436,39.092l-14.583,62.5l29.166,0l-14.583,-62.5Z" style={{fill:'#cecdce'}}/>
            </g>
        </svg>
    );
}
