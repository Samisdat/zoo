import React, {useEffect, useState} from 'react';

import {getGeoJson, getOneGeoJson} from './api/geojson/geojson';
import {Feature, FeatureCollection, LineString, Polygon} from 'geojson';
import {MapRoot} from 'components/Map/Root';
import {NavigationInterface} from "../components/Navigation/Interfaces";
import {MapSearch} from "../components/Map/Search";
import {createChainedFunction} from "@material-ui/core";
import {getZoomboxes} from "./api/search/autocomplete";

export interface IndexProps{
    border: Feature<Polygon>;
    simpleWays: FeatureCollection<LineString>[];
    boundingBox: FeatureCollection<LineString>;
    zoomBoxes: any;
    navigation?: NavigationInterface;
    setFocus?: Function;
    toggleSearch?: Function;
    toggleTeaser?: Function;

}

export interface IndexState {
    openSearch: boolean;
}

export default function Index(props:IndexProps) {

    console.log(props.navigation.focus)

    const {toggleSearch} = props;

    const [state, setState] = useState<IndexState>({
        openSearch: false,
    });

    return (
        <React.Fragment>
            <MapRoot setFocus={props.setFocus} {...props}></MapRoot>
            <MapSearch
                setFocus={props.setFocus}
                toggleSearch={toggleSearch}
                zoomBoxes={props.zoomBoxes}
                {...props.navigation}
            />
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

    let zoomBoxes = await getZoomboxes();

    const indexProps:IndexProps = {
        border: border,
        simpleWays: simpleWay,
        boundingBox:boundingBoxCollection,
        zoomBoxes: zoomBoxes
    };

    return {
        props: indexProps
    }
}
