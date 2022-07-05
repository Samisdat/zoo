import React, {useEffect, useRef, useState} from 'react';

import {Globe} from './Globe';

import * as topojson from 'topojson-client';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const simplify = require('simplify-geojson');


const rewind = require('@mapbox/geojson-rewind');

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
            distributionShape = simplify(distributionShape, 0.1);

            distributionShape = rewind(distributionShape, true);

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
