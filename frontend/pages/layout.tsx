import React, {useState} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import {MapElement} from "../strapi-api/entity/map-element/map-element";

import {ViewportProvider} from "../components/viewport/ViewportProvider";
import Foo from "../components/viewport/Foo";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

export default function Layout (props) {

    const [teaser, setTeaser] = useState<MapElement>(undefined);

    const classes = useStyles();

    return (
        <ViewportProvider>
            <Foo />
        </ViewportProvider>
    );
}
