import React, {useContext} from 'react';
import {Viewport, viewportContext} from "./ViewportProvider";

export const useViewport = ():Viewport => {
    /* We can use the "useContext" Hook to acccess a context from within
       another Hook, remember, Hooks are composable! */
    const viewport = useContext<Viewport>(viewportContext);
    return viewport;
}