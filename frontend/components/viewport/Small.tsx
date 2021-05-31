import React from 'react';
import {useViewport} from "./useViewport";

export const Small = ({children}) => {

    const { breakpoint } = useViewport();

    if('small' === breakpoint){
        return (<React.Fragment>{children}</React.Fragment>);
    }

    return (<React.Fragment></React.Fragment>);

}
