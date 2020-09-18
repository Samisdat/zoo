import {useEffect, useState} from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "hooks/persisted-state";
import CurrentPosition from 'components/D3/CurrentPosition';

export default function Parent(props) {

    const text = 'Map'

    const [d3PropertiesState, setD3PropertiesState] = usePersistedState('d3',undefined);

    const createD3Map = ()=> {
        console.log('createD3Map')

        const width = window.innerWidth;
        const height = window.innerHeight;

        const projection = d3.geoMercator()
            .translate([width / 2, height / 2]);

        const geoPath =  d3.geoPath().projection(projection);

        const d3Properties = {
            width:width,
            height:height,
            geoPath:geoPath
        };

        setD3PropertiesState(d3Properties);

    };

    useEffect(() => {
        console.log('parent useEffect');

        if(undefined === d3PropertiesState){
            createD3Map();
        }

    });


    return (
        <div id="parent">
            <div>{text}</div>
            <CurrentPosition d3PropertiesState={d3PropertiesState}></CurrentPosition>
        </div>
    );

}
