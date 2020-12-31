import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MediaCard from './MediaCard';

export default function Teaser(props) {

    const {toggleTeaser} = props;

    return (

        <SwipeableDrawer
            variant="persistent"
            anchor='bottom'
            open={props.openTeaser}
            onClose={()=>{}}
            onOpen={toggleTeaser}

        >
        <MediaCard toggleTeaser={toggleTeaser} {...props}></MediaCard>
        </SwipeableDrawer>
        
    );
}
