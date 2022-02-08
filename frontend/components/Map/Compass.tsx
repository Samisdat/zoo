import * as d3 from 'd3';

import React, {useEffect, useRef, useState} from 'react';
import {angle, svg} from "../../constants";
import {MapTransformInterface, useMap} from "./Context/MapContext";

export const Compass = (props) => {

    const offset = 200;
    const width = 112;
    const viewport = 393;

    const compassRef = useRef(null);
    const mouseRef = useRef(null);



    const {
        state: {path, focus, transform, ref, dimension, center, projection, position},
        dispatch
    } = useMap();

    const [startPos, setStartPos] = useState<any>(undefined);
    const [pos, setPos] = useState<any>(undefined);

    const [angleState, setAngleState] = useState<any>(angle);

    useEffect(()=>{
        //console.log(angle)

        dispatch({
            type: 'SET_ANGLE',
            angle: angleState
        });

    },[angleState]);
    /*
    useEffect(()=>{

        setTimeout(()=>{

            const update: MapTransformInterface = {
                x: transform.x,
                y: transform.y,
                k: transform.k,
                angle: (transform.angle + 10)
            };

            dispatch({
                type: 'SET_TRANSFORM',
                transform: update
            });

        }, 1000)

    },[transform]);
     */

    useEffect(() => {

        const center = {
            y: (viewport / 2),
            x: (viewport / 2)
        };


        const rotate = `rotate(${angleState} ${center.x} ${center.y})`;

        d3.select(compassRef.current).select('#Layer1')
            //.transition(200)
            .attr('transform', rotate);


    },[transform]);

    useEffect(() => {

        if(startPos && pos){

            const x = startPos.x - pos.x;
            const y = startPos.y - pos.y;

            const newAngle = Math.atan2(y, x) * 180 / Math.PI;

            setAngleState(newAngle);

        }

    },[startPos, pos]);

    useEffect(() => {

        if(!startPos){
            return;
        }

        const scaledStartPos = {
            x: startPos.x / width * viewport,
            y: startPos.y / width * viewport
        }

        const points = [scaledStartPos];

        if(pos){
            const scaledPos = {
                x: pos.x / width * viewport,
                y: pos.y / width * viewport
            }

            points.push(scaledPos);

        }

        d3.select(mouseRef.current)
            .selectAll('circle')
            .data(points)
            .join('circle')
            .attr('cx', (d)=>{
                return d.x
            })
            .attr('cy', (d)=>{
                return d.y
            })
            .attr('r', '10')
            .attr('fill', 'red')

        if(2 === points.length){

            d3.select(mouseRef.current)
                .selectAll('line')
                .data(points)
                .join('line')
                .attr('x1', (d)=>{
                    return points[0].x;
                })
                .attr('y1', (d)=>{
                    return points[0].y;
                })
                .attr('x2', (d)=>{
                    return points[1].x;
                })
                .attr('y2', (d)=>{
                    return points[1].y;
                })
                .attr('stroke', 'blue')
                .attr('stroke-width', '10px')


        }

    },[startPos, pos]);

    useEffect(() => {

        const startMove = (event) => {

            event.preventDefault();

            if('pointerdown' === event.type){
                setStartPos({
                    x:event.x - offset,
                    y:event.y - offset
                });
                return;
            }

            if('pointerup' === event.type){
                setStartPos(undefined);
                setPos(undefined);
                return;
            }

            if('pointermove' === event.type){

                setPos({
                    x:event.x - offset,
                    y:event.y - offset
                });

                return;
            }

            //console.log('move', event.type, 'pointerdown' === event.type);

        }

        const move = (event) => {

            if('pointerdown' === event.type){
                console.log(event);
            }

            console.log('move', event.type, 'pointerdown' === event.type);

        }

        const endMove = (event) => {

            console.log('endMove', event.type);

        }

        if (compassRef && compassRef.current) {

            const compassGroup = d3.select(compassRef.current);

            compassGroup.select('#compass')
                .on('pointerenter pointerout pointerup pointerdown pointermove', startMove)

            return () => {

                compassGroup.select('#compass')
                    .on('pointerout pointerup pointerdown pointermove', null)

            };

        }
    });


    return (
        <svg
            ref={compassRef}
            width="112"
            height="112"
            x={offset}
            y={offset}
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
                <circle id="compass" cx="196.436" cy="196.399" r="196.41" style={{fill:'red', opacity:0}}/>
            </g>
            <g
                ref={mouseRef}
            >

            </g>
        </svg>
    );
}
