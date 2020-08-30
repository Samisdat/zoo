import React, {useEffect, useState} from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "../hooks/persisted-state";
import {
    updateCurrentPosition
} from "../helper/getCurrentPosition";

export default function ZooMap() {

    const [data, setData] = useState([1, 1, 1]);

    const circleRadius = 60;
    const circleDiameter = circleRadius * 2;

    const renderSvg = () => {


        const svg = d3.select('svg');
        
        const circle = svg
            .selectAll('circle')
            .data(data);

        circle
            .enter()
            .append('circle')
            .attr('cy', circleRadius)
            .attr('cx', (d, i) => circleRadius + (i * circleDiameter))
            .attr('r', 0)
            .transition()
            .attr('r', circleRadius);

        circle
            .exit()
            .transition()
            .attr('r', 0)
            .remove();

    };

    useEffect(() => {
       renderSvg();
    });

    const addCircle = () => {

        const update = [
            ...data
        ];

        if (update.length < 5) {
            update.push(1);
        }

        setData(update);

    };

    const removeCircle = () => {

        const update = [
            ...data
        ];

        update.pop();
        setData(update);
    };

    return (
        <div>
            <div className="container my-3 my-md-5">
                <svg className="my-3"></svg>

                <button onClick={addCircle}>Add circle</button>
                <button onClick={removeCircle}>Remove circle</button>
            </div>
        </div>
    );

}