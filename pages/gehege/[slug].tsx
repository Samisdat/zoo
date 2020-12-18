import React from 'react';
import { useRouter } from 'next/router'
import {GehegeMap} from "../../components/D3/GehegeMap";
import {getGeoJson, getOneGeoJson} from "../api/geojson/geojson";
import {Feature, FeatureCollection, LineString, Polygon} from "geojson";
import {NavigationInterface} from "../../components/Navigation/Interfaces";
import {IndexProps} from "../index";

export default function Gehege(props) {


    const router = useRouter()
    const { slug } = router.query

    return (
        <React.Fragment>
            <GehegeMap slug={slug} {...props}></GehegeMap>
        </React.Fragment>
    );
}

export async function getStaticProps(context) {

    let geoJson = await getGeoJson();

    const extractCollection = (slug) => {

        const extracted = geoJson.features.find((feature)=>{

            return (slug === feature.properties.slug)

        });

        return extracted;

    };

    const extractWays = () => {

        const extracted = geoJson.features.filter((feature)=>{

            return ('way-simple' === feature.properties.slug)

        });

        return extracted;

    };

    const border:Feature<Polygon> = extractCollection('aussengrenze');

    let simpleWay = extractWays();

    let boundingBox = extractCollection('bounding-box');

    let boundingBoxCollection:FeatureCollection<LineString> = {
        type: "FeatureCollection",
        features: [boundingBox]
    };

    let zoomBoxes = await getOneGeoJson('zoomboxes') as FeatureCollection<Polygon>;

    const navigation:NavigationInterface = {
        activeMainItem: 'map',
        openSearch: false,
        openSideMenu: false
    };

    const indexProps:IndexProps = {
        border: border,
        simpleWays: simpleWay,
        boundingBox:boundingBoxCollection,
        zoomBoxes:zoomBoxes,
        navigation:navigation
    };

    return {
        props: indexProps
    }
}

export async function getStaticPaths() {

    const zoomBoxesGeoJson = await getOneGeoJson('zoomboxes') as FeatureCollection<Polygon>;

    const gehege = zoomBoxesGeoJson.features.map((feature:Feature<Polygon>)=>{
        return feature.properties.slug;
    });

    const gehegePaths = gehege.map((enclorure:string)=>{
        return {
            params:{
                slug:enclorure
            }
        }
    });

    return {

        paths: gehegePaths,

        fallback: false,
    }
}