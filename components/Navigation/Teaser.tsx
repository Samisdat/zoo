import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MediaCard from './MediaCard';

export default function Teaser(props) {

    const {toggleTeaser} = props;

    return (

        <SwipeableDrawer
            anchor='bottom'
            open={props.openTeaser}
            onClose={toggleTeaser}
            onOpen={toggleTeaser}
            style={{
                zIndex:3000
            }}
        >
        <MediaCard toggleTeaser={toggleTeaser} {...props}></MediaCard>
        </SwipeableDrawer>
        
    );
}
