import React, {useState, createContext, useEffect} from 'react';

export type Breakpoint = 'extra-small' | 'small' | 'medium' | 'large';

export interface Viewport {
    width: number;
    height: number;
    breakpoint: string;
}

const defaultViewport = {
    width: undefined,
    height: undefined,
    breakpoint: 'extra-small',
};

export const viewportContext = createContext<Viewport>(defaultViewport);

const getBreakpointName = (width:number):Breakpoint => {

    if( undefined === width){
        return 'extra-small';
    }

    if( 600 > width){
        return 'extra-small';
    }

    if( 960 > width){
        return 'small';
    }

    if( 1280 > width){
        return 'medium';
    }

    return 'large'

};

export const ViewportProvider = ({ children }) => {

    const [viewport, setViewport] = useState<Viewport>(defaultViewport);

    const handleWindowResize = () => {

        const width = window.innerWidth;
        const height = window.innerHeight;
        const breakpoint = getBreakpointName(width);

        setViewport({
            width,
            height,
            breakpoint,
        });

    }

    useEffect(() => {

        const width = window.innerWidth;
        const height = window.innerHeight;
        const breakpoint = getBreakpointName(width);

        setViewport({
            width,
            height,
            breakpoint,
        });

    }, []);

    useEffect(() => {

        window.addEventListener("resize", handleWindowResize);

        return () => window.removeEventListener("resize", handleWindowResize);

    }, []);

    return (
        <viewportContext.Provider value={ viewport }>
            {children}
        </viewportContext.Provider>
    );
};
