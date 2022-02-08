import * as d3 from 'd3';

import React, {useEffect, useRef, useState} from 'react';
import {angle, svg} from "../../constants";
import {Dimension, MapTransformInterface, useMap} from "./Context/MapContext";

interface EventBarProps{
    name: string,
    intense: number;
    last: number;
    dimension:Dimension;
}
interface EventBars{
    [index:string]:EventBarProps
}

const EventBar = (props) => {

    const ref = useRef(null);

    const transform = `translate(0 ${props.offset * 20})`;

    useEffect(() => {

        d3.select(ref.current)
            .selectAll('rect')
            .data([props.intense])
            .join('rect')
            .attr('x', 0)
            .attr('y', -10)
            .attr('width', (d)=>{
                return d;
            })
            .attr('height', 10)
            .attr('fill', 'blue')
            .attr('opacity', .5)

    });

    return (
        <g
            ref={ref}
            transform={transform}
        >
            <text>{props.name}</text>
        </g>
    );

}

export const Multitouch = (props) => {

    const touchRef = useRef(null);

    const {
        state: {path, focus, transform, ref, dimension, projection, position},
        dispatch
    } = useMap();

    const startTime = Date.now();


    const _eventBars:EventBars = {
        pointermove:{
            name: 'pointermove',
            intense: 0,
            last: startTime,
            dimension
        },
        mousemove:{
            name: 'mousemove',
            intense: 0,
            last: startTime,
            dimension
        }
    };

    const [eventBars, setEventBars] = useState<EventBars>(_eventBars);

    useEffect(() => {

        const diff = 50;

        const interval = setInterval(() => {

            const now = Date.now();

            const update = {...eventBars};

            for(const eventName in update){

                if(diff > (update[eventName].last - now)){
                    update[eventName].last = now;
                    update[eventName].intense -= 10;

                    if(0 > update[eventName].intense){
                        update[eventName].intense = 0;
                    }

                }

            }

            setEventBars(update);

        }, diff);
        return () => clearInterval(interval);
    }, []);
    useEffect(() => {


    });

    useEffect(() => {

        if(!ref || !dimension){
            return;
        }

        /*
        d3.select(ref.current)
        .on(
            "click wheel " +
            "mouseenter mouseout mousedown mouseup mousemove " +
            "touchstart touchend touchmove " +
            "pointerenter pointerout pointerup pointerdown pointermove",
            function(event) {
                //event.preventDefault();
                console.log(event)
            }
        )

         */

        d3.select(ref.current)
            .on(
                "pointermove mousemove",
                (event) => {

                    const key = event.type;

                    const now = Date.now();

                    eventBars[key].last = now - startTime;
                    eventBars[key].intense += 5;

                    setEventBars({...eventBars});
                }
            )




    },[ref, dimension]);


    return (
        <g
            ref={touchRef}
            transform='translate(0, 150)'
        >
            <EventBar key='mousemove'
                      offset={0}
                  {...eventBars.mousemove}
            />
            <EventBar key='pointermove'
                      offset={1}
                {...eventBars.pointermove}
            />
        </g>
    );
}
