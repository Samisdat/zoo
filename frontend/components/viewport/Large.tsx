import React from 'react';
import {useViewport} from './useViewport';

export const Large = ({children}) => {

    const { breakpoint } = useViewport();

    if('large' === breakpoint){
        return (<React.Fragment>{children}</React.Fragment>);
    }

    return (<React.Fragment></React.Fragment>);

}
