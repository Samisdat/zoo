import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {Detail} from "./Detail";
import {MiniMap} from "./MiniMap";
import {Legend} from "./Legend";

import * as topojson from 'topojson-client';
const simplify = require('simplify-geojson');

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

const distributionService = async (apiUrl):Promise<any> => {

    const promise = new Promise<any>((resolve, reject) => {

        fetch(apiUrl)
            .then(res => res.json())
            .then(
                (result:any) => {

                    resolve(result);

                },
                (error) => {
                    console.log(error);
                }
            );

    });

    return promise

}


export const Distribution = (props) => {

    const classes = useStyles();

    const [distributionShape, setDistributionShape] = useState<any>(undefined);
    const [world, setWorld] = useState<any>(undefined);

    useEffect(() => {

        distributionService('/api/distribution/afrikanischer-elefant')
        .then((data) =>{
            let distribution = topojson.feature(data, data.objects.distribution);
            distribution = simplify(distribution, 0.1)

            setDistributionShape(distribution);
        });

    },[])

    useEffect(() => {

        distributionService('/api/distribution/world')
        .then((data) =>{
            setWorld(data);
        });

    },[])

    if(!distributionShape || ! world){
        return (
            <React.Fragment>
                <div
                    className={classes.root}
                >

                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <div
                className={classes.root}
            >
                <Detail
                    distributionGeoJson={distributionShape}
                    worldCountriesJson={world}
                />
                <MiniMap
                        distributionGeoJson={distributionShape}
                        worldCountriesJson={world}
                />
            </div>
            <Legend
                distributionGeoJson={distributionShape}
            ></Legend>
        </React.Fragment>
    );

}
