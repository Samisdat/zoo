import React from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {Detail} from "./Detail";
import {MiniMap} from "./MiniMap";
import {Legend} from "./Legend";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
            width: '100%',
            height: '400px',
            background: 'red',
            [theme.breakpoints.down('sm')]: {
                background: 'blue',
            },
        },
    }),
);

export const Distribution = (props) => {

    const classes = useStyles();

    if(!props.distributionGeoJson){
        return (<React.Fragment/>);
    }

    return (
        <React.Fragment>
            <div
                className={classes.root}
            >
                <Detail
                    distributionGeoJson={props.distributionGeoJson}
                    worldCountriesJson={props.worldCountriesJson}
                />
                <MiniMap
                    distributionGeoJson={props.distributionGeoJson}
                    worldCountriesJson={props.worldCountriesJson}
                />
            </div>
            <Legend
                distributionGeoJson={props.distributionGeoJson}
            ></Legend>
        </React.Fragment>
    );

}
