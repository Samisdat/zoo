import React, {useEffect, useRef, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {Detail} from "./Detail";
import {MiniMap} from "./MiniMap";
import {Legend} from "./Legend";
import {Globe} from "./Globe";
import {SvgGlobe} from "./SvgGlobe";

import * as topojson from 'topojson-client';

const simplify = require('simplify-geojson');

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'relative',
            width: '100%',
            height: '700px',
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


export const DistributionGlobe = (props) => {

    const globeContainer = useRef(null);

    const classes = useStyles();

    const [distributionShape, setDistributionShape] = useState<any>(undefined);
    const [world, setWorld] = useState<any>(undefined);
    const [size, setSize] = useState(350);

    useEffect(() => {

        distributionService('/api/globe/world')
            .then((data) =>{

                let land = topojson.feature(data, data.objects.land);
                land = simplify(land, 0.1)
                setWorld(land);
            });

    },[])

    useEffect(() => {

        distributionService(`/api/distribution/${props.slug}`)
        .then((data) =>{

            let distributionShape = topojson.feature(data, data.objects.distribution);
            distributionShape = simplify(distributionShape, 0.1)
            setDistributionShape(distributionShape);

        });

    },[])

    useEffect(() => {

        const currentSize = globeContainer.current.clientWidth;
        const maxSize = 350;

        const useSize = (currentSize > maxSize)?maxSize:currentSize;

        setSize(useSize);

    },[])

    if(!distributionShape || ! world){
        return (
            <React.Fragment>
                <div
                    ref={globeContainer}
                    className={classes.root}
                >

                </div>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            <div
                ref={globeContainer}

            >
                <Globe
                    size={size}
                    distributionShape={distributionShape}
                    world={world}
                />
            </div>
            {/*
            <Legend
                distributionGeoJson={distributionShape}
            ></Legend>
            */}
        </React.Fragment>
    );

}
