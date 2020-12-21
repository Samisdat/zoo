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

    const setDimensions = () => {

        setMapState({
            ...mapState,
            width: window.innerWidth,
            height: window.innerHeight
        });

    }

    useEffect(() => {

        const width = window.innerWidth;
        const height = window.innerHeight;

        if(width === mapState.width && height === mapState.height ){
            return;
        }

        setDimensions();

        window.addEventListener('resize', setDimensions)
    }, [mapState]);

    return (

        <React.Fragment>
            <p>width: {mapState.width}</p>
            <p>width: {mapState.height}</p>
            <p>focus: {mapState.focus}</p>
        </React.Fragment>

    );

}
