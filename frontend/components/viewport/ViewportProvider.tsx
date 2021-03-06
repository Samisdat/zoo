import React, {useState, createContext, useEffect} from 'react';
import throttle from 'lodash.throttle';

export type Breakpoint = 'small' | 'large';

export interface Viewport {
    width: number;
    height: number;
    breakpoint: string;
}

const defaultViewport:Viewport = {
    width: undefined,
    height: undefined,
    breakpoint: 'small',
};

export const viewportContext = createContext<Viewport>(defaultViewport);

const getBreakpointName = (width:number):Breakpoint => {

    if( undefined === width){
        return 'small';
    }

    if( 960 > width){
        return 'small';
    }

    return 'large'

};

export const ViewportProvider = ({ children }) => {

    const [viewport, setViewport] = useState<Viewport>(defaultViewport);

    const getViewport = ():Viewport => {

        const width = window.innerWidth;
        const height = window.innerHeight;
        const breakpoint = getBreakpointName(width);

        return {
            width,
            height,
            breakpoint,
        };

    };

    const handleWindowResize = () => {

        return throttle(() => {

            setViewport(getViewport());

        }, 200);


    }

    useEffect(() => {

        setViewport(getViewport());

    }, []);

    useEffect(() => {

        window.addEventListener("resize", handleWindowResize());

        return () => window.removeEventListener("resize", handleWindowResize());

    }, []);

    return (
        <viewportContext.Provider value={ viewport }>
            <div className={`viewport-${viewport.breakpoint}`}>
                {children}
            </div>
        </viewportContext.Provider>
    );
};
