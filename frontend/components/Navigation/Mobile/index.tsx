import React from 'react';

import {NavigationListGroupInterface} from '../../NavigationList/NavigationListInterfaces';
import {NavigationMobileClosed} from './Closed';
import {NavigationMobileOpened} from './Opened';

interface NavigationMobileProps{
    categories: NavigationListGroupInterface[];
}

export const NavigationMobile = ({categories}:NavigationMobileProps) =>{

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <NavigationMobileOpened
                categories={categories}
                open={open}
                handleClose={handleClose}
            />
            <NavigationMobileClosed
                handleClickOpen={handleClickOpen}
            />
        </React.Fragment>
    );
}
