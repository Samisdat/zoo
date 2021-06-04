import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

import {Detail} from "./Detail";
import {MiniMap} from "./MiniMap";
import {Legend} from "./Legend";
import {Globe} from "./Globe";

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

    const classes = useStyles();

    const [distributionShape, setDistributionShape] = useState<any>(undefined);
    const [world, setWorld] = useState<any>(undefined);
    const [names, setNames] = useState(undefined);

    useEffect(() => {

        distributionService('/api/globe/world')
            .then((data) =>{
                setWorld(data);
            });

    },[])

    useEffect(() => {

        distributionService(`/api/distribution/${props.slug}`)
        .then((data) =>{
            setDistributionShape(data);
        });

    },[])

    useEffect(() => {

        distributionService('/api/globe/world-country-names')
            .then((data) =>{
                setNames(data);
            });

    },[])


    if(!distributionShape || ! world || ! names){
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
                <Globe
                    distributionShape={distributionShape}
                    world={world}
                    names={names}
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
