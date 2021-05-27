import {useContext} from 'react';
import {Viewport, viewportContext} from "./ViewportProvider";

export const useViewport = ():Viewport => {

    const viewport = useContext<Viewport>(viewportContext);
    return viewport;

}