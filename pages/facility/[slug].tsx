import React from 'react';
import { useRouter } from 'next/router'

import {getGeoJson, getOneGeoJson} from "../api/geojson/geojson";
import {Feature, FeatureCollection, LineString, Polygon} from "geojson";
import {NavigationInterface} from "../../components/Navigation/Interfaces";
import {IndexProps} from "../index";
import {MapRoot} from "../../components/D3/MapRoot";
import {getFullGeoJson} from "../api/geojson/list";


export default function Gehege(props) {


    const router = useRouter()
    const { slug } = router.query


    return (
        <React.Fragment>
            <h1>{slug}</h1>
        </React.Fragment>
    );
}

export async function getStaticProps(context) {

    let getJson = await getFullGeoJson();

    const props: any = {
        geoJson: getJson
    };

    return {
        props: props
    }
}


export async function getStaticPaths() {

    const getJson = await getFullGeoJson();

    const facilitySlugs = getJson.features
    .filter((feature:Feature)=>{
        return ('facility-box' === feature.properties.type);
    })
    .map((feature:Feature)=>{

        return {
            params:{
                slug: feature.properties.slug
            }
        }

        return ;
    });

    return {

        paths: facilitySlugs,

        fallback: false,
    }
}