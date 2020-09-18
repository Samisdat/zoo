import {useEffect, useState} from 'react';

export default function CurrentPosition(props) {

    const anId = 'anId';

    useEffect(() => {

        console.log('start usefx current pos');


        if(undefined === props.d3PropertiesState){
            return;
        }

        console.log(props)
        console.log('really start usefx current pos');
        console.log(props)
        document.getElementById(anId).innerHTML = JSON.stringify(props.d3PropertiesState);

    });

    const text = 'Kind'
    return (
        <div>
            <div>{text}</div>
            <div id={anId}></div>
        </div>
    );

}
