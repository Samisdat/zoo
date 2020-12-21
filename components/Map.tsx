import React, {Fragment, useEffect, useState} from 'react';

interface MapStateInterface {
    width: number;
    height: number;
    focus: string;
}

const MapStateDefault: MapStateInterface = {
    width: undefined,
    height: undefined,
    focus: 'center'
}

export const Map = (props) => {

    const [mapState, setMapState] = useState<MapStateInterface>(MapStateDefault);

    const setHash = () => {

        let hash = location.hash.replace('#', '');

        if('' === hash){
            hash = 'center';
        }

        if(hash === mapState.focus){
            return;
        }

        // @TODO Validate
        setMapState({
            ...mapState,
            focus: hash
        });
    };

    const setDimensions = () => {

        setMapState({
            ...mapState,
            width: window.innerWidth,
            height: window.innerHeight
        });

    }

    // @TODO add reducer to prevent render twice
    useEffect(() => {

        const width = window.innerWidth;
        const height = window.innerHeight;

        if(width === mapState.width && height === mapState.height ){
            return;
        }

        console.log('render')

        setDimensions();
        setHash();

        window.addEventListener('resize', setDimensions);
        window.addEventListener('hashchange', setHash);

    }, [mapState]);

    return (

        <React.Fragment>
            <p>width: {mapState.width}</p>
            <p>width: {mapState.height}</p>
            <p>focus: {mapState.focus}</p>
            <p><a href="#eins">Eins</a></p>
            <p><a href="#zwei">Zwei</a></p>
            <p><a href="#drei">Drei</a></p>
            <p><a href="#vier">Vier</a></p>
        </React.Fragment>

    );

}
